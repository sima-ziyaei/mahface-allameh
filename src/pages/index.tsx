import Categories from "@/components/Categories";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import t from "../../i18next/locales/fa/translation.json";
import MostRecentCourses from "@/components/MostRecentCourses";
import MostPopularCourses from "@/components/MostPopularCourses";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  const comments = [
    {
      name: "سیما ضیایی",
      comment:
        "اگر همیشه ته ذهنت دوست داشتی تو دانشگاه‌های تراز اول ایران باشی، ولی حالا به هر علتی نشده، مکتب‌خونه این امکان رو برای تو فراهم کرده، تازه خیلی بهتر، این تدریس‌ها همیشه در دسترس تو هستند. 😊 دیگه نگرانی بابت غیبت کردن و گرفتن جزوه نداری و اگر جایی از درس رو متوجه نشدی، می‌تونی اون قسمت رو دوباره ببینی. 😍",
    },
    {
      name: "سبحان صفاری",
      comment:
        "دوره کارشناسی همیشه دوست داشتم دروسی مثل مکانیک سیالات و ترمودینامیک و... رو با تدریس چندتا استاد بخونم تا اینکه یه روز بصورت اتفاقی با سایت مکتب خونه آشنا شدم که فیلم کلاسهای دانشگاه‌های درجه یک رو منتشر کرده بودن. اما قضیه وقتی برام جذاب‌تر شد که با دوره‌های مکتب پلاسشون آشنا شدم و برای پروژه پایانی کارشناسی‌ام که با نرم افزار انسیس فلوئنت کار میکردم از این دوره کمک گرفتم و حتی جذاب‌تر از اون هم این بود که با اینکه پروژه و سوالاتم خارج از درس بود ولی استاد دوره کاملا با حوصله بهم کمک کرد و مشاوره داد.",
    },
    {
      name: "اشکان رضوی زاده",
      comment:
        "Your training tutorials really helped me and I really appreciate Maktabkhooneh and his kind stuffs. Thank you Maktabkhooneh for helping and developing me. 😘😘",
    },
  ];

  return (
    <main>
      <Layout>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination
          centeredSlides
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          loop
          speed={800}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img src="/assets/Banner_Slider_Dsk3.webp" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/Dsk_1.webp" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/Dsk_4.webp" />
          </SwiperSlide>
        </Swiper>

        <Categories />

        <MostRecentCourses />

        <MostPopularCourses />

        <div>
          <h4 className="mx-auto w-fit mt-16 mb-8 text-2xl">
            {
              t[
                "cooperation-with-the-best-universities-and-educational-institutions"
              ]
            }
          </h4>
          <div className="flex gap-6 mb-10 mx-auto w-fit ">
            <img width={100} height={100} src="/assets/esfahan.png" />
            <img width={100} height={100} src="/assets/Frame_1491.png" />
            <img width={100} height={100} src="/assets/Frame_1494_2.png" />
            <img width={100} height={100} src="/assets/Frame_1492_2.png" />
            <img width={100} height={100} src="/assets/Frame_1492.png" />
            <img width={100} height={100} src="/assets/Frame_1493_2.png" />
            <img width={100} height={100} src="/assets/Frame_1493.png" />
            <img width={100} height={100} src="/assets/Frame_1494.png" />
            <img width={100} height={100} src="/assets/Frame_1496.png" />
          </div>
        </div>

        <div className="mx-4 my-24">
          <p className="mx-auto w-fit text-2xl my-6"> {t["from-you"]} </p>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination
            centeredSlides
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop
            speed={800}
            spaceBetween={16}
            slidesPerView={1}
          >
            {comments.map((el) => {
              return (
                <SwiperSlide className="bg-white border border-solid border-gray-200 rounded-2xl  p-6">
                  <p className="mb-4 text-lg"> {el.name} </p>
                  <p className="mr-4 text-zinc-800"> {el.comment} </p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Layout>
    </main>
  );
}
