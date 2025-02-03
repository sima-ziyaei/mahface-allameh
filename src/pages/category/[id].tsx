import Layout from "@/components/layout/Layout";
import { Course } from "@/models/course.model";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { CourseServices } from "@/services/Course";
import AddToCartButton from "@/components/AddToCartButton";
import { ImageServices } from "@/services/Image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";

const CourseView = ({ params }) => {
  const [courses, setCourses] = useState<Course[]>();
  const [images, setImages] = useState(new Map());
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();
  const { id }: { id?: string } = router.query;

  useEffect(() => {
    setLoading(true)
    if (id) {
      CourseServices.getWithCategoryId(id)
        .then((res) => {
          const imageRequests = res.data.map((el) => {
            if (el.imageId) {
              return ImageServices.getImageByImageId(el.imageId)
                .then((result) => ({ courseId: el.id, image: result.data.base64File }))
                .catch(() => null);
            }
            return null;
          });

          Promise.all(imageRequests).then((imageResults) => {
            const newImages = new Map();
            imageResults.forEach((item) => {
              if (item) {
                newImages.set(item.courseId, item.image);
              }
            });

            setImages(newImages);
          });

          setCourses(res.data);
          setLoading(false);
        })
        .catch((err) => { });
    }
  }, [id]);

  return (
    <Layout>
      <div className="p-4">
        {loading
          ? Array.from(Array(5)).map((el, i) => {
            return (
              <div
                key={i}
                className=" border border-solid border-gray-200 bg-white flex gap-4 rounded-2xl p-4 mb-4"
              >
                <Skeleton width={200} height={160} />
                <div>
                  <Skeleton width={300} height={25} />
                  <Skeleton className=" mt-6" width={400} height={20} />
                  <Skeleton className=" mt-6" width={100} height={20} />
                  <Skeleton className=" mt-6" width={260} height={20} />
                </div>
                <Skeleton
                  width={210}
                  height={40}
                  containerClassName="mr-auto mt-auto"
                />
              </div>
            );
          })
          : courses?.map((course) => {
            return (
              <a
                href={`/course/${course.id}`}
                className=" border border-solid border-gray-200 bg-white flex gap-4 rounded-2xl p-4 mb-4"
                key={course.id}
              >
                <img
                  src={`data:image/png;base64,${images.get(course.id)}`}
                  alt="course"
                  className="w-[200px]"
                />

                <div>
                  <h1 className=" font-bold text-2xl"> {course?.title}</h1>
                  <p className=" mt-6"> {course?.courseDescription} </p>

                  <p className=" mt-4">
                    {t["course-teacher"]} : {course.teacherName}{" "}
                  </p>
                  <p className=" mt-4">
                    {t["course-cost"]} : {course?.cost} تومان
                  </p>
                </div>

                <div className="mr-auto mt-auto">
                  <AddToCartButton course={course} />
                </div>
              </a>
            );
          })}
      </div>
    </Layout>
  );
};

export default CourseView;
