import useGetWalletWorth from "@/hooks/useGetWalletWorth";
import { formatPrecision } from "@/utils/functions/formatBalance";
import Image from "next/image";
const DashboardHeading = () => {
  const { netWorth } = useGetWalletWorth();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-10">
        <Image
          className="block dark:hidden"
          src={"/images/logo-v2-black.png"}
          alt="Dapfy"
          width={200}
          height={80}
        />

        <Image
          className="hidden dark:block"
          src={"/images/logo-v2-white.png"}
          alt="Dapfy"
          width={200}
          height={80}
        />
      </div>
      <h1 className="text-6xl gradienteTitle mb-5">
        Get Rewarded For Your Interactions
      </h1>
      <h3 className="flex items-center text-2xl">
        Built for 𝕏, powered by{" "}
        <span className="ml-[-25px]">
          <svg
            width="200"
            height="32"
            viewBox="0 0 200 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-v-6a4166c5=""
            className="h-5"
          >
            <path
              d="M13.9119 25.7837L21.7577 7.29736H27.6077V31.4H23.7511V10.9849L15.0829 31.5287H12.3088L3.72653 11.1137V31.4H0V7.29736H6.11022L13.9119 25.7837Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M48.7253 27.4987C47.9004 29.2137 45.5192 31.8737 41.5742 31.8737C36.2422 31.8737 32.6016 27.8849 32.6016 22.3949V10.2148H36.5883V21.6661C36.5883 25.6549 38.8861 28.2712 42.5267 28.2712C46.1673 28.2712 48.7253 25.5699 48.7253 21.6661V10.2148H52.6703V31.4024H48.7253V27.4987Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M81.4469 31.4H76.3751C71.3893 31.4 68.8779 29.0412 68.8779 24.3237V13.7299H64.1719V10.2124H68.8779V4.87057H72.8229V10.2124H81.4469V13.7299H72.8229V23.4225C72.8229 26.51 73.8196 27.7975 77.2442 27.7975H81.4494V31.4H81.4469Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M104.295 31.7862H101.131L91.0312 10.2148H95.4525L102.82 26.5537L110.145 10.2148H114.218L104.293 31.7862H104.295Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M136.021 21.2799H118.208C118.424 25.2249 121.286 28.3149 125.489 28.3149C129.692 28.3149 131.513 26.0411 131.86 25.3561H135.76C135.414 27.1999 132.682 31.9174 125.489 31.9174C118.858 31.9174 114.219 27.0274 114.219 20.8086C114.219 14.5898 118.856 9.69983 125.096 9.69983C131.337 9.69983 136.018 14.3323 136.018 21.2799H136.021ZM118.468 18.0199H131.644C130.647 14.8036 128.349 13.0449 125.099 13.0449C121.633 13.0449 119.291 14.9324 118.468 18.0199Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M143.789 31.4H139.844V10.2148H143.789V14.1186C144.395 12.5736 146.217 10.0448 151.244 10.0448H153.557V13.9485H151.158C145.654 13.9485 143.791 15.6636 143.791 19.4386V31.4049L143.789 31.4Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M162.236 22.0937C158.12 21.6224 155.216 19.6912 155.216 15.7899C155.216 11.8885 158.77 9.61481 164.014 9.61481C171.253 9.61481 173.593 13.3023 174.285 15.4473H170.08C169.604 14.8886 168.001 12.9598 164.011 12.9598C160.761 12.9598 159.114 14.1186 159.114 15.6611C159.114 17.2037 160.199 18.1049 162.754 18.4061C164.443 18.6199 165.484 18.7073 167.348 18.9211C172.419 19.5649 174.585 21.7074 174.585 25.6112C174.585 29.1724 171.29 32.0024 165.224 32.0024C157.683 32.0024 155.039 27.4136 154.562 25.4848H158.768C158.984 26.1699 160.717 28.5724 165.227 28.5724C168.867 28.5724 170.644 27.2849 170.644 25.6136C170.644 23.9423 169.734 22.9536 166.83 22.6111L162.236 22.0961V22.0937Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M84.3906 0H88.5075V6.13376H84.3906V0ZM84.4765 10.2075H88.4216V31.3951H84.4765V10.2075Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M57.6562 3.69968H61.6013V31.3951H57.6562V3.69968Z"
              fill="currentColor"
              className="logo-char"
              data-v-6a4166c5=""
            ></path>
            <path
              d="M190.418 12.9161L199.997 7.88766L198.386 4.84628L189.615 8.3322C189.389 8.42208 189.139 8.42208 188.913 8.3322L180.142 4.84628L178.531 7.88766L188.11 12.9161L178.531 17.9446L180.142 20.986L188.913 17.5C189.139 17.4102 189.389 17.4102 189.615 17.5L198.386 20.986L199.997 17.9446L190.418 12.9161Z"
              fill="#23F7DD"
              className="logo-x"
              data-v-6a4166c5=""
            ></path>
          </svg>
        </span>
      </h3>
    </div>
  );
};

export default DashboardHeading;
