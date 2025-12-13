'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'venobox/dist/venobox.min.css';
import { useRouter, useParams } from 'next/navigation';
import { Divider, message, Modal } from 'antd';
import {
  ConvertFormData,
  useSetState,
  validateForm,
} from '@/utils/commonFunction.utils';
import Models from '@/imports/models.import';
import FormField from '@/commonComponents/FormFields';
import Pagination from '@/commonComponents/Pagination';

const AlbumMain = () => {
  const params = useParams();
  const id = params.id;

  console.log('id', id);

  const { confirm } = Modal;

  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const fileInputRef = useRef(null);

  const [state, setState] = useSetState({
    isOpen: false,
    name: '',
    description: '',
    location: '',
    date: '',
    whoCanView: null,
    error: {},
    isUploadPic: false,
    uploadedImages: [],
  });

  console.log('id', id);
  useEffect(() => {
    import('venobox/dist/venobox.min.js').then((venobox) => {
      new venobox.default({
        selector: '.child-gallery-single',
        numeration: true,
        infinigall: true,
        spinner: 'rotating-plane',
      });
    });
  }, []);

  useEffect(() => {
    albumDetails();
    photoList(1);
    localStorage.removeItem('memoriesBack');
  }, [id]);

  const albumDetails = async () => {
    try {
      const res = await Models.gallery.albumDetails(id);
      setState({
        album_name: res?.album_name,
        album_date: res?.album_date,
        description: res?.description,
        album_location: res?.album_location,
        public_view: res?.public_view ? 'Public' : 'Site Members',
        data: res,
      });
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const photoList = async (page) => {
    try {
      const res = await Models.gallery.photoList(id, page);
      console.log('photoList --->', res);
      setState({
        photoList: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
      });
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const handleCancel = () => {
    setState({ isOpen: false });
  };

  const updateAlbum = async () => {
    try {
      setState({ btnLoadng: true });
      const body = {
        album_name: state.album_name,
        description: state.description,
        album_location: state.album_location,
        album_date: state.album_date ? state.album_date : '',
        public_view: state.public_view == 'Public' ? 'True' : 'False',
      };

      const validationRules = {
        album_name: { required: true },
        public_view: { required: true },
        album_date: { required: true },
      };
      const isValid = validateForm(body, validationRules, errorFun);
      if (isValid) {
        const formData = ConvertFormData(body);
        await Models.gallery.updateAlbum(id, formData);
        messageApi.success('Album updated successfully');
        await albumDetails();
        setState({ btnLoadng: false, isOpen: false });
      } else {
        setState({ btnLoadng: false });
      }
      if (!isValid) return;
    } catch (error) {
      if (error?.data?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
      setState({ btnLoadng: false });

      console.log('error: ', error);
    }
  };

  const errorFun = (errors) => {
    setState({ error: errors });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure, You want to delete album?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleDeleteAlbum();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDeleteAlbum = async () => {
    try {
      await Models.gallery.deleteAlbum(id);
      router.push('/gallery');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files);
    const newImages = imageArray.filter((image) => {
      return !state.uploadedImages.some(
        (uploadedImage) =>
          uploadedImage.name === image.name &&
          uploadedImage.lastModified === image.lastModified
      );
    });
    setState({ uploadedImages: [...state.uploadedImages, ...newImages] });
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    const updatedImages = state.uploadedImages.filter((_, i) => i !== index);
    setState({ uploadedImages: updatedImages });
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    try {
      setState({ uploadLoading: true });
      console.log("uploadPhoto");
      

      for (const image of state.uploadedImages) {
        const formData = new FormData();
        formData.append('photos', image);
        await Models.gallery.addPhoto(id, formData);
      }

      setState({
        isUploadPic: false,
        uploadLoading: false,
        uploadedImages: [],
      });

      await photoList(1);
    } catch (error) {
      setState({ uploadLoading: false });
      console.log('✌️error --->', error);
    }
  };

  console.log('state.photoList', state.photoList);

  const handlePageChange = (number) => {
    photoList(number);
    setState({ currentPage: number });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return number;
  };

  const deletePhoto = async (item) => {
    console.log('✌️item --->', item);
    console.log('hello');

    try {
      const res = await Models.gallery.deletePhoto(item?.id);

      await photoList(state.currentPage);
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const approvel = async (item) => {
    try {
      await Models.gallery.approvePhoto(item?.id);
      await photoList(state.currentPage);
      messageApi.success('Photo approved successfully');
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  return (
    <>
      <div className='container album'>
        <div className='row g-3 parent-gallery-container KITgallery '>
          <div className='d-flex justify-content-between py-4 mb-4'>
            <h4 className='mb-0'>{state.album_name}</h4>

            {(state.data?.is_owner || state.data?.is_admin) && (
              <div className='rbt-button-group justify-content-end'>
                <a
                  className='rbt-btn btn-xs bg-primary-opacity radius-round'
                  href='#'
                  title='Edit Album'
                  onClick={() => setState({ isOpen: true })}
                >
                  <i className='feather-edit pl--0' />
                </a>
                <a
                  className='rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger'
                  href='#'
                  title='Delete Album'
                  onClick={() => showDeleteConfirm()}
                >
                  <i className='feather-trash-2 pl--0' />
                </a>

                <a
                  className='rbt-btn btn-xs  radius-round'
                  href='#'
                  title='Create Album'
                  onClick={() => setState({ isUploadPic: true })}
                >
                  <i className='feather-plus-circle pl--0' />
                </a>
              </div>
            )}
          </div>

          {state.photoList?.length > 0 ? (
            <div className='row parent-gallery-container'>
              {state.photoList &&
                state.photoList.map((data, index) => (
                  <div className='col-lg-3 col-md-4 col-sm-6 col-6' key={index}>
                    <div className='instagram-grid KITalbum'>
                      <div
                        className='child-gallery-single gal-grid'
                        key={index}
                        data-gall='gallery01'
                        onClick={(e) => {
                          if (e.target.closest('.icon')) {
                            // ✅ If the click came from the delete icon, prevent navigation
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className='rbt-gallery rounded'>
                          <img
                            className='w-100 rounded'
                            src={data.url}
                            width={253}
                            height={274}
                            alt='Gallery Images'
                          />
                        </div>

                        <div className='gal-delete-icon'>
                          {(data?.is_admin || data?.is_owner) && (
                            <span
                              className='icon pr-5'
                              onClick={(e) => {
                                e.preventDefault(); // ✅ Prevent Link navigation
                                e.stopPropagation(); // ✅ Stop bubbling
                                deletePhoto(data); // ✅ Call delete function
                              }}
                              title='Delete image'
                            >
                              <i className='feather-trash'></i>
                            </span>
                          )}

                          {data?.is_admin &&
                            (data?.approved == true ? (
                              <span
                                className='icon '
                                onClick={() => approvel(data)}
                                title='Approved'
                              >
                                <i className='feather-check-circle'></i>
                              </span>
                            ) : (
                              <span
                                className='icon '
                                onClick={() => approvel(data)}
                                title='Pending'
                              >
                                <i className='feather-x-circle'></i>
                              </span>
                            ))}
                        </div>

                        <span className='user-info'>
                          <span className='user-name'>
                            {data?.approved == true ? 'Approved' : 'Pending'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <>
              <div className=' album-none'>
                <h5>Album is Empty !</h5>

                <div
                  className='rbt-btn btn-xs  radius-round'
                  
                  title='Create Album'
                  onClick={() => setState({ isUploadPic: true })}
                >
                  Upload Images
                  <i className='feather-plus-circle pl--2' />
                </div>
              </div>
            </>
          )}
        </div>
        {state.photoList?.length > 0 && (
          <div className='d-flex justify-content-center mt-4'>
            <Pagination
              activeNumber={handlePageChange}
              totalPage={state.total}
              currentPages={state.currentPage}
            />
          </div>
        )}
      </div>

      {/* For Edit Album */}
      <Modal
        title={<div className='custom-modal-header'>Edit Album</div>}
        open={state.isOpen}
        onCancel={() => handleCancel()}
        footer={false}
        centered
      >
        {/* 4. Form Wrapper */}
        <form className='applicants-form' onSubmit={updateAlbum}>
          {/* 5. Status Select (Load More) */}
          <div style={{ marginTop: '15px' }}>
            <FormField
              type='text'
              name='Name'
              label='Name'
              onChange={(e) => setState({ album_name: e.target.value })}
              value={state.album_name}
              required
              error={state.error?.album_name}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='text'
              name='Description'
              label='Description'
              // className={"applicant-input"}
              onChange={(e) => setState({ description: e.target.value })}
              value={state.description}
              // error={errMsg?.end_year}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              label='Date'
              type='date'
              name='Date'
              value={state.album_date}
              onChange={(e) => setState({ album_date: e.target.value })}
              required
              error={state.error?.album_date}
            />
          </div>

          {/* 7. Submit Button */}
          <div className='d-flex justify-content-end mt-3 gap-4'>
            <button
              className='rbt-btn btn-gradient radius-round sm-btn'
              type='button'
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className='rbt-btn btn-gradient radius-round sm-btn'
              type='submit'
            >
              {state.btnLoadng ? 'loading' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Upload photos */}
      <Modal
        title={<div className='custom-modal-header'>Upload Photos</div>}
        open={state.isUploadPic}
        onCancel={() => setState({ isUploadPic: false })}
        footer={false}
        centered
      >
        {/* 4. Form Wrapper */}
        <form className='applicants-form' onSubmit={uploadPhoto}>
          {/* 5. Status Select (Load More) */}
          <div style={{ marginTop: '15px' }}>
            <FormField
              type='file'
              name='Name'
              label='Name'
              accept='image/*'
              multiple
              onChange={handleFileChange}
              className='p-0'
              required
              ref={fileInputRef}
            />

            <div
              className='uploaded-images mt_10'
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            >
              {state.uploadedImages.length > 0 &&
                state.uploadedImages.map((image, index) => (
                  <div
                    key={index}
                    className='uploaded-image-item'
                    style={{
                      width: 'calc(33.333% - 10px)', // To make 3 images per row with spacing
                      display: 'flex',
                      flexDirection: 'column', // Stack the image and button vertically
                      alignItems: 'center', // Center the image and button horizontally
                      justifyContent: 'center', // Center align vertically
                      marginBottom: '10px',
                      border: '0.5px solid grey',
                      padding: '10px',
                      borderRadius: '20px',
                    }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      style={{
                        width: '100%', // Make image take full width of the container
                        height: '100px', // Fixed height for the images
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />

                    {/* Remove button below the image */}
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        background: 'rgba(255, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '5px 10px',
                        borderRadius: '50px',
                        marginTop: '5px', // Space between image and button
                        fontSize: '14px',
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* 7. Submit Button */}
          <div className='d-flex justify-content-end mt-3 gap-4'>
            <button
              className='rbt-btn btn-gradient radius-round sm-btn'
              type='submit'
            >
              {state.btnLoadng ? 'loading' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AlbumMain;
