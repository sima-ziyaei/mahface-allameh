import Categories from "@/components/Categories";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import t from "../../i18next/locales/fa/translation.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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

        <div>
          <h4 className="mx-auto w-fit my-6 text-2xl"> {t["cooperation-with-the-best-universities-and-educational-institutions"]} </h4>
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
      </Layout>
    </main>
  );
}
