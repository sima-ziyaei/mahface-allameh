import t from "../../i18next/locales/fa/translation.json";

const Footer = () => {
  return (
    <div className="bg-[#E0E3EC] p-6 ">
      <div className="flex">
        <div>
          <img height={50} width={50} src="/assets/allameh.png" />
          <div className="">
            <div className="flex gap-2 my-4">
              <img width={16} src="/assets/icons/call-calling.svg" />
              <p className="text-xs"> 021-33054886</p>
            </div>
            <div className="flex gap-2">
              <img width={16} src="/assets/icons/sms-edit.svg" />
              <p className="text-xs"> info@allamehtabatabaei.org </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 w-full mt-16 justify-around ">
          <div>
            <p className="text-sm text-gray-700 mb-2"> {t["about-us"]} </p>
            <p className="text-sm text-gray-700 mb-2"> {t["contact-us"]} </p>
            <p className="text-sm text-gray-700 mb-2"> {t["faq"]} </p>
            <p className="text-sm text-gray-700 mb-2"> {t["how-to-use"]} </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">
              {" "}
              {t["certificate-inquiry"]}{" "}
            </p>
            <p className="text-sm text-gray-700 mb-2"> {t["weblog"]} </p>
            <p className="text-sm text-gray-700 mb-2"> {t["maktab-tak"]} </p>
            <p className="text-sm text-gray-700 mb-2"> {t["maktab-class"]} </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">
              {" "}
              {t["reserve-studio"]}{" "}
            </p>
            <p className="text-sm text-gray-700 mb-2"> {t["become-mentor"]} </p>
            <p className="text-sm text-gray-700 mb-2">
              {" "}
              {t["job-opportunities"]}{" "}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {" "}
              {t["organizational-training"]}{" "}
            </p>
            <p className="text-sm text-gray-700 mb-2"> {t["training"]} </p>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <img src="/assets/logo.png" />
        <img src="/assets/samandehi.webp" />
      </div>
      <div className="mt-6">
        <p> {t["follow-us"]} </p>
        <div className="flex gap-3 mt-4">
          <a className="bg-white p-2 rounded-2xl">
            <img src="/assets/icons/send-2.svg" />
          </a>
          <a className="bg-white p-2 rounded-2xl">
            <img src="/assets/icons/instagram.svg" />
          </a>
          <a className="bg-white p-2 rounded-2xl">
            <img src="/assets/icons/facebook.svg" />
          </a>
          <a className="bg-white p-2 rounded-2xl">
            <img src="/assets/icons/youtube.svg" />
          </a>
          <a className="bg-white p-2 rounded-2xl">
            <img src="/assets/icons/Twitter Outline.svg" />
          </a>
          <a className="bg-white p-2 rounded-2xl">
            <img src="/assets/icons/Linkedin Outline.svg" />
          </a>
          <a className="bg-white p-2 rounded-2xl">
            <img src="/assets/icons/whatsapp.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
