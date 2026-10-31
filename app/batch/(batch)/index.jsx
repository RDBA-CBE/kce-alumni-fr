"use client";

import Separator from "@/components/Common/Separator";

import MobileMenu from "@/components/Header/MobileMenu";

import Context from "@/context/Context";
import Store from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import MasterDataSidebar from "@/components/(Alumni)/component/KITMaster/MasterDataSidebar";
import { useSetState, validateForm } from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import { message, Modal } from "antd";
import FormField from "@/commonComponents/FormFields";
import CourseTable from "@/components/(Alumni)/component/Tables/courseTable";
import BatchTable from "@/components/(Alumni)/component/Tables/batchTable";

const Course = () => {
  const { confirm } = Modal;
  const currentYear = new Date().getFullYear();
  const startYearOptions = Array.from({ length: 10 }, (_, index) => {
    const year = String(currentYear - index);
    return { value: year, label: year };
  });

  const [state, setState] = useSetState({
    currentPage: 1,
    batchList: [],
    courseList: [],
    currentCoursePage: 1,
    hasCourseLoadMore: null,
    next: null,
    previous: null,
    total: 0,
    btnLoading: false,
    loading: false,
    editId: null,
  });

  const [formData, setFormData] = useState({
    title: "",
    start_year: "",
    end_year: "",
    course: [],
  });

  const endYearOptions = formData.start_year
    ? Array.from(
        {
          length: Math.max(0, 2040 - Number(formData.start_year)),
        },
        (_, index) => {
          const year = String(Number(formData.start_year) + index + 1);
          return { value: year, label: year };
        }
      )
    : [];
  const availableStartYearOptions =
    formData.start_year &&
    !startYearOptions.some(
      (option) => option.value === String(formData.start_year)
    )
      ? [
          ...startYearOptions,
          {
            value: String(formData.start_year),
            label: String(formData.start_year),
          },
        ]
      : startYearOptions;

  const [errMsg, setErrMsg] = useState({});

  useEffect(() => {
    const loadInitialData = async () => {
      const initialCourses = await getCourses(1);
      await GetBatch(1, initialCourses);
    };

    loadInitialData();
  }, []);

  const GetBatch = async (page, initialCourseData) => {
    try {
      setState({ loading: true });
      const res = await Models.masters.batchList(page);
      let courseOptions = initialCourseData?.options || state.courseList;
      let coursePage =
        initialCourseData?.page || state.currentCoursePage;
      let hasMoreCourses =
        initialCourseData?.hasMore ?? state.hasCourseLoadMore;

      const getCourseIds = (batch) => {
        const ids = Array.isArray(batch?.course_id)
          ? batch.course_id
          : batch?.course_id
          ? [batch.course_id]
          : [];
        return ids.map((course) =>
          course && typeof course === "object"
            ? course.course_id ?? course.id ?? course.value
            : course
        );
      };

      const batchRows = res?.results || [];
      const hasUnloadedCourse = () =>
        batchRows.some((batch) =>
          getCourseIds(batch).some(
            (id) =>
              !courseOptions.some(
                (course) => String(course.value) === String(id)
              )
          )
        );

      while (hasUnloadedCourse() && hasMoreCourses) {
        coursePage += 1;
        const courseRes = await Models.masters.courseList(coursePage);
        const nextOptions = (courseRes?.results || []).map((course) => ({
          value: course.course_id,
          label: course.title,
        }));
        courseOptions = [...courseOptions, ...nextOptions];
        hasMoreCourses = courseRes?.next;
      }

      const batchesWithCourses = batchRows.map((batch) => ({
        ...batch,
        courseNames: getCourseIds(batch)
          .map(
            (id) =>
              courseOptions.find(
                (course) => String(course.value) === String(id)
              )?.label || String(id)
          )
          .join(", "),
      }));

      setState({
        batchList: batchesWithCourses,
        courseList: courseOptions,
        currentCoursePage: coursePage,
        hasCourseLoadMore: hasMoreCourses,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to load batches:", error);
      setState({ loading: false });
    }
  };

  const getCourses = async (page) => {
    try {
      const res = await Models.masters.courseList(page);
      const courseOptions = (res?.results || []).map((course) => ({
        value: course.course_id,
        label: course.title,
      }));
      setState({
        courseList: courseOptions,
        currentCoursePage: page,
        hasCourseLoadMore: res?.next,
      });
      return {
        options: courseOptions,
        page,
        hasMore: res?.next,
      };
    } catch (error) {
      console.error("Failed to load courses:", error);
      return {
        options: [],
        page,
        hasMore: null,
      };
    }
  };

  const courseListLoadMore = async () => {
    if (!state.hasCourseLoadMore) return;

    try {
      const nextPage = state.currentCoursePage + 1;
      const res = await Models.masters.courseList(nextPage);
      const courseOptions = (res?.results || []).map((course) => ({
        value: course.course_id,
        label: course.title,
      }));
      setState({
        courseList: [...state.courseList, ...courseOptions],
        currentCoursePage: nextPage,
        hasCourseLoadMore: res?.next,
      });
    } catch (error) {
      console.error("Failed to load more courses:", error);
    }
  };

  const update = async (approval) => {
    const selectedCourseIds = Array.isArray(approval?.course_id)
      ? approval.course_id
      : approval?.course_id
      ? [approval.course_id]
      : [];

    let courseOptions = state.courseList;
    let coursePage = state.currentCoursePage;
    let hasMoreCourses = state.hasCourseLoadMore;

    const hasUnloadedCourse = () =>
      selectedCourseIds.some((courseId) => {
        const id =
          courseId && typeof courseId === "object"
            ? courseId.course_id ?? courseId.id ?? courseId.value
            : courseId;
        return !courseOptions.some(
          (course) => String(course.value) === String(id)
        );
      });

    try {
      if (courseOptions.length === 0 && selectedCourseIds.length > 0) {
        const res = await Models.masters.courseList(1);
        courseOptions = (res?.results || []).map((course) => ({
          value: course.course_id,
          label: course.title,
        }));
        coursePage = 1;
        hasMoreCourses = res?.next;
      }

      while (hasUnloadedCourse() && hasMoreCourses) {
        coursePage += 1;
        const res = await Models.masters.courseList(coursePage);
        const nextOptions = (res?.results || []).map((course) => ({
          value: course.course_id,
          label: course.title,
        }));
        courseOptions = [...courseOptions, ...nextOptions];
        hasMoreCourses = res?.next;
      }
    } catch (error) {
      console.error("Failed to load courses for batch:", error);
      message.error("Unable to load all course options for this batch.");
    }

    if (courseOptions !== state.courseList) {
      setState({
        courseList: courseOptions,
        currentCoursePage: coursePage,
        hasCourseLoadMore: hasMoreCourses,
      });
    }

    setFormData({
      start_year: String(approval?.start_year ?? ""),
      end_year: String(approval?.end_year ?? ""),
      title: approval?.title,
      course: selectedCourseIds.map((courseId) => {
        const id =
          courseId && typeof courseId === "object"
            ? courseId.course_id ?? courseId.id ?? courseId.value
            : courseId;
        return (
          courseOptions.find(
            (course) => String(course.value) === String(id)
          ) || {
            value: id,
            label:
              courseId && typeof courseId === "object"
                ? courseId.title || courseId.label || String(id)
                : String(id),
          }
        );
      }),
    });
    setState({ editId: approval.batch_id, isOpen: true });
  };

  const createBatch = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        start_year: { required: true },
        end_year: { required: true },
        title: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;
      const body = {
        title: formData.title,
        start_year: formData.start_year,
        end_year: formData.end_year,
        course_id: formData.course.map((course) => course.value),
      };
      const res = await Models.masters.create_batch(body);
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      GetBatch(1);
      setFormData({
        title: "",
        start_year: "",
        end_year: "",
        course: [],
      });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const updateBatch = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        start_year: { required: true },
        end_year: { required: true },
        title: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;
      const body = {
        title: formData.title,
        start_year: formData.start_year,
        end_year: formData.end_year,
        course_id: formData.course.map((course) => course.value),
      };
      const res = await Models.masters.update_batch(state.editId, body);
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      GetBatch(1);
      setFormData({
        title: "",
        start_year: "",
        end_year: "",
        course: [],
      });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const updateStatus = (approval) => {
    confirm({
      title: approval.is_active
        ? "Are you sure you want to InActive this Course?"
        : "Are you sure you want to Active this Course?",

      okText: approval.is_active ? "InActive" : "Active",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        confirmApproval(approval);
      },
      onCancel() {},
    });
  };

  const confirmApproval = async (approval) => {
    try {
      setState({ btnLoading: true });
      const body = {
        is_active: !approval.is_active,
      };
      let res = await Models.masters.deactivate_course(
        approval.course_id,
        body
      );
      message.success(res.message || "Operation successful!");
      GetCourse(1);
      setState({ btnLoading: false });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (name === "start_year") {
        return {
          ...prevState,
          start_year: value,
          end_year: "",
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />

          <div className="rbt-page-banner-wrapper">
            <div className="rbt-banner-image admin" />
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-11 col-xl-10 con-wid">
                  <div className="container-fuild">
                    <div className="row">
                      
                      <div className="col-lg-12">
                        <div className="row g-5">
                          <div className="col-lg-3">
                            <MasterDataSidebar />
                          </div>

                          <div className="col-lg-9">
                            <BatchTable
                              heading="Batch"
                              tableHead={[
                                "Batch Name",
                                "Course",
                                "Start Year",
                                "End Year",
                                "Actions"
                              ]}
                              subtitile_1="Create Batch"
                              tableData={state.batchList}
                              loading={state.loading || state.btnLoading}
                              total={state.total}
                              currentPage={state.currentPage}
                              updateUser={(item) => update(item)}
                              handlePageChange={(number) => {
                                setState({ currentPage: number });
                                GetBatch(number);
                              }}
                              updateStatus={(item) => updateStatus(item)}
                              subtitile_1_onPress={() => {
                                setFormData({
                                  title: "",
                                  start_year: "",
                                  end_year: "",
                                  course: [],
                                });
                                setErrMsg({});
                                setState({ isOpen: true, editId: null });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
               
              </div>
            </div>
            <Modal
              title={state.editId ? "Edit Batch" : "Create Batch"}
              open={state.isOpen}
              onCancel={() => {
                setErrMsg({});
                setState({ isOpen: false, editId: null });
              }}
              footer={false}
              className=""
            >
              <form
                onSubmit={state.editId ? updateBatch : createBatch}
                className="applicants-form"
              >
                <div className="mt-3">
                  <FormField
                    type="text"
                    name="title"
                    label="Batch Name"
                    value={formData.title}
                    onChange={handleChange}
                    error={errMsg?.title}
                    required={true}
                  />
                </div>

                <div className="mt-3">
                  <FormField
                    type="select"
                    name="start_year"
                    label="Start Year"
                    required
                    value={String(formData.start_year || "")}
                    onChange={handleChange}
                    error={errMsg?.start_year}
                    options={availableStartYearOptions}
                  />
                </div>
                <div className="mt-3">
                  <FormField
                    type="select"
                    name="end_year"
                    label="End Year"
                    required
                    value={String(formData.end_year || "")}
                    onChange={handleChange}
                    error={errMsg?.end_year}
                    options={endYearOptions}
                  />
                </div>
                <div className="mt-3">
                  <FormField
                    type="loadMoreSelect"
                    name="course"
                    label="Course"
                    placeholder="Course"
                    value={formData.course}
                    onChange={(selectedCourses) =>
                      setFormData((previous) => ({
                        ...previous,
                        course: selectedCourses || [],
                      }))
                    }
                    options={state.courseList}
                    isMulti
                    loadMore={courseListLoadMore}
                  />
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="rbt-btn btn-gradient radius-round sm-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
          </div>

           {/* <Separator /> */}
          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default Course;
