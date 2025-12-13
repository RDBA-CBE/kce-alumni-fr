// ---------------------------
// SAFE LOCAL STORAGE FUNCTION
// ---------------------------
const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const cart = JSON.parse(localStorage.getItem("hiStudy") || "[]");

      // ensure always array
      return Array.isArray(cart) ? cart : [];
    } catch (err) {
      return [];
    }
  }

  return [];
};

// ---------------------------
// INITIAL STATE
// ---------------------------
const init = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 80,
  loading: false,
  error: false,
  msg: "",
};

// ---------------------------
// CART REDUCER
// ---------------------------
export const CartReducer = (state = init, action) => {
  switch (action.type) {
    case "CART_REQ":
      return {
        ...state,
        loading: true,
      };

    case "CART_REQ_OUT":
      return {
        ...state,
        loading: false,
      };

    case "ADD_TO_CART": {
      const { id, amount, product } = action.payload;

      const tempItem = state.cart.find((i) => i.id === id);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id) {
            let newAmount = cartItem.amount + amount;

            // if product.max exists
            if (cartItem.max && newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }

            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });

        return {
          ...state,
          cart: tempCart,
          msg: "Item already added!",
        };
      }

      const newItem = {
        id,
        price: product.price,
        product,
        amount,
        max: product.max || 999999, // fallback max
      };

      return {
        ...state,
        cart: [...state.cart, newItem],
        msg: "Item added successfully",
      };
    }

    case "TOGGLE_CART_AMOUNT": {
      const { id, value } = action.payload;

      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === "inc") {
            let newAmount = item.amount + 1;

            if (item.max && newAmount > item.max) newAmount = item.max;

            return { ...item, amount: newAmount };
          }

          if (value === "dec") {
            let newAmount = item.amount - 1;

            if (newAmount < 1) newAmount = 1;

            return { ...item, amount: newAmount };
          }
        }
        return item;
      });

      return {
        ...state,
        cart: tempCart,
      };
    }

    case "COUNT_CART_TOTALS": {
      const safeCart = Array.isArray(state.cart) ? state.cart : [];

      const { total_items, total_amount } = safeCart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;

          total.total_items += amount || 0;
          total.total_amount += (price || 0) * (amount || 0);

          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );

      return {
        ...state,
        total_items,
        total_amount,
      };
    }

    case "DELETE_CART_ITEM": {
      const tempCart = state.cart.filter((item) => item.id !== action.payload);

      return {
        ...state,
        cart: tempCart,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "SET_CART_ERROR":
      return {
        ...state,
        error: true,
      };

    case "CLEAR_CART_ERROR":
      return {
        ...state,
        error: false,
        msg: "",
      };

    default:
      return state;
  }
};
