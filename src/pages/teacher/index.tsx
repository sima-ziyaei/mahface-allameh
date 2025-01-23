import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import { TeacherServices } from "@/services/Teacher";
import toast from "react-hot-toast";
import TeacherDialog from "./TeacherDialog";

function Teacher() {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};

  const [teacherDialogState, setTeacherDialogState] = useState({ open: false });

  function handleTeaching() {
    // if (userInfo?.isTeacher) {
    setTeacherDialogState((prev) => ({ ...prev, open: true }));
    // } else {
    //   TeacherServices.getByUserId(userInfo?.userId)
    //     .then((res) => {})
    //     .catch((err) => toast.error("درخواست شما با خطا مواجه شد."));
    // }
  }

  return (
    <Layout>
      <div className="w-full h-100 relative">
        <img
          alt="همین امروز تدریس رو شروع کن"
          src="https://statics.maktabkhooneh.org/front/images/landing/teaching/header.webp"
          className="w-full h-full"
        />

        <div className="absolute right-[400px] top-[400px] flex flex-col gap-8">
          <p className=" text-bold text-3xl">{t["time-to-teach"]}</p>

          <Button
            variant="contained"
            onClick={handleTeaching}
            size="large"
            sx={{
              fontSize: 20,
              px: 8,
              backgroundColor: "#009CA7",
              fontWeight: "bold",
            }}
          >
            {userInfo?.isTeacher?t["teacher-panel"]:t["start-teaching"]}
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center  w-full h-110 py-10">
        <p className="text-4xl text-[#3c3c3c] text-center mb-20">
          {t["why-start-teaching"]}
        </p>
        <div className="w-full flex p-4 items-center justify-center gap-20">
          <div className="flex flex-col h-full justify-center items-center gap-4">
            <img src="https://statics.maktabkhooneh.org/front/images/landing/teaching/teach.webp" />
            <p className="text-2xl">به سبک خودت آموزش بده</p>
            <p className="text-lg w-96 text-center">
              موضوعی که دوست داری رو انتخاب کن و به روشی که دوست داری ارائه بده
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <img src="	https://statics.maktabkhooneh.org/front/images/landing/teaching/improvement.webp" />
            <p className="text-2xl">زندگی دیگران رو متحول کن</p>
            <p className="text-lg w-96 text-center">
              با آموزش آنلاین به دیگران کمک کن تا علایق خودشون رو پیدا و در مسیر
              شغلی خود پیشرفت کنند
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <img src="https://statics.maktabkhooneh.org/front/images/landing/teaching/reward.webp" />
            <p className="text-2xl">از مزایای آن بهره‌مند شو</p>
            <p className="text-lg w-96 text-center">
              شبکه کاری و تخصصی خودت رو گسترش بده، در کنار برترین اساتید قرار
              بگیر و کسب درآمد کن
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#009CA7] h-48 flex items-center justify-around">
        <div className="flex flex-col gap-8 w-60 items-center justify-center">
          <span className="font-bold text-5xl text-white">+۲۰ هزار</span>
          <span className="text-2xl text-white">ساعت آموزش</span>
        </div>

        <div className="flex flex-col gap-8 w-60 items-center justify-center">
          <span className="font-bold text-5xl text-white">+۱ هزار</span>
          <span className="text-2xl text-white">استاد فعال</span>
        </div>

        <div className="flex flex-col gap-8 w-60 items-center justify-center">
          <span className="font-bold text-5xl text-white">+۱ میلیون</span>
          <span className="text-2xl text-white">دانشجو</span>
        </div>

        <div className="flex flex-col gap-8 w-60 items-center justify-center">
          <span className="font-bold text-5xl text-white">+۲ میلیون</span>
          <span className="text-2xl text-white">ثبت نام</span>
        </div>
      </div>

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

      <div className="w-full flex items-center gap-10">
        <div className="w-1/4 flex flex-col items-center justify-center gap-8">
          <span
            className="text-xl
           text-center"
          >
            سوالات متدوال
          </span>
          <img src="https://statics.maktabkhooneh.org/front/images/landing/teaching/faq.webp" />
        </div>
        <div className="w-3/4 flex flex-col items-center gap-8">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">چرا تدریس در مکتبخونه؟</Typography>
            </AccordionSummary>
            <AccordionDetails>
              اگر شما تصمیم دارید که دانش و تجربه خود را با دیگران به اشتراک
              بگذارید و دانشجویان را توانمند کنید تا به اهداف خود برسند،
              بنابراین تدریس کردن بهترین فرصت برای شماست. اگرچه همه انواع تدریس
              به شما اجازه می‌دهد که تجربه خود را به اشتراک بگذارید، تدریس
              آنلاین به شما این انعطاف را می‌دهد که در مقیاس بزرگ‌تر و آن‌گونه
              که راحت‌تر هستید، دانش خود را ارائه دهید.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                چگونه یک مدرس علامه‌کده باشم؟
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              به عنوان مدرس در علامه‌کده ثبت‌نام انجام دهید. سپس از طریق پنلی که
              در اختیار شما قرار می‌گیرد، شما می‌توانید عنوان دوره، مخاطبان،
              تشریح جزئیات، قیمت و نهایتا جلسات دوره (اعم از ویدئویی، صوتی، متنی
              و تمرینات) خود را بارگذاری نمایید. در تمام این مراحل کارشناسان
              علامه‌کده در کنار شما هستند تا تجربه شیرینی از تدریس را برای شما
              رقم بزنند.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                مارکتینگ علامه‌کده چه مزیتی برای شما دارد؟
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              کارشناسان علامه‌کده همه روزه در تلاش هستند تا دانشجویان علامه‌کده
              را بیشتر بشناسند تا دوره مناسب را به دانشجوی مورد نظر ارائه دهند.
              دانش ما از بررسی رفتار و نیازمندی‌های میلیون‌ها دانشجو در طی
              سالیان فعالیت علامه‌کده در ارائه دوره‌های آموزشی آنلاین به شما کمک
              می‌کند تا به تعداد مخاطبان وسیع‌تری از آنچه تا کنون در اختیار
              داشتید، دسترسی پیدا کنید. علاوه‌براین، استراتژی‌های مختلف مارکتینگ
              علامه‌کده به شما کمک خواهد کرد تا پتانسیل فروش دوره آموزشی خود را
              افزایش دهید که از آن جمله می‌توان به کمپین‌های دوره‌ای، تبلیغات در
              وبسایت‌های مختلف، سئو در گوگل، ایمیل مارکتینگ، اس ام اس مارکتینگ،
              پوش نوتیفیکیشن و غیره اشاره کرد.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                قیمت دوره و سهم استاد چگونه تعیین می شود؟
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              کارشناسان علامه‌کده همه روزه در تلاش هستند تا دانشجویان علامه‌کده
              را بیشتر بشناسند تا دوره مناسب را به دانشجوی مورد نظر ارائه دهند.
              دانش ما از بررسی رفتار و نیازمندی‌های میلیون‌ها دانشجو در طی
              سالیان فعالیت علامه‌کده در ارائه دوره‌های آموزشی آنلاین به شما کمک
              می‌کند تا به تعداد مخاطبان وسیع‌تری از آنچه تا کنون در اختیار
              داشتید، دسترسی پیدا کنید. علاوه‌براین، استراتژی‌های مختلف مارکتینگ
              علامه‌کده به شما کمک خواهد کرد تا پتانسیل فروش دوره آموزشی خود را
              افزایش دهید که از آن جمله می‌توان به کمپین‌های دوره‌ای، تبلیغات در
              وبسایت‌های مختلف، سئو در گوگل، ایمیل مارکتینگ، اس ام اس مارکتینگ،
              پوش نوتیفیکیشن و غیره اشاره کرد.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <TeacherDialog
        teacherDialogState={teacherDialogState}
        setTeacherDialogState={setTeacherDialogState}
        userInfo={userInfo}
      />
    </Layout>
  );
}

export default Teacher;
