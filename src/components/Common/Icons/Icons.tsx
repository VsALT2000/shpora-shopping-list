import React from "react";

interface PropsType {
    onClick?: () => void;
    className?: string;
}

// Есть вариант как с React.FC<React.HTMLProps<HTMLButtonElement>>? Искал, но чёт не получилось.
export const FilterIcon: React.FC<PropsType> = (props) => {
    return (
        <svg onClick={props.onClick} width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path
                d="M15.1315 1H2.86852C2.06982 1 1.59343 1.89015 2.03647 2.5547L6.83205 9.74808C6.94156 9.91234 7 10.1054 7 10.3028V16.382C7 17.1253 7.78231 17.6088 8.44721 17.2764L10.4472 16.2764C10.786 16.107 11 15.7607 11 15.382V10.3028C11 10.1054 11.0584 9.91234 11.1679 9.74808L15.9635 2.5547C16.4066 1.89015 15.9302 1 15.1315 1Z"
                stroke="#000000"
                strokeWidth="2"
            />
        </svg>
    );
};
export const ArrowBackIcon: React.FC<PropsType> = (props) => {
    return (
        <svg onClick={props.onClick} width="30" height="30" viewBox="0 0 16 12" fill="none">
            <path d="M15 6H1M1 6L6.25 1M1 6L6.25 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export const SortIcon: React.FC<PropsType> = (props) => {
    return (
        <svg onClick={props.onClick} width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0.5C4.55228 0.5 5 0.947715 5 1.5V14.0858L6.29289 12.7929C6.68342 12.4024 7.31658 12.4024 7.70711 12.7929C8.09763 13.1834 8.09763 13.8166 7.70711 14.2071L4.70711 17.2071C4.31658 17.5976 3.68342 17.5976 3.29289 17.2071L0.292893 14.2071C-0.0976311 13.8166 -0.0976311 13.1834 0.292893 12.7929C0.683418 12.4024 1.31658 12.4024 1.70711 12.7929L3 14.0858V1.5C3 0.947715 3.44772 0.5 4 0.5ZM9 1.5C9 0.947715 9.44771 0.5 10 0.5H19C19.5523 0.5 20 0.947715 20 1.5C20 2.05228 19.5523 2.5 19 2.5H10C9.44771 2.5 9 2.05228 9 1.5ZM10 5.5C9.44771 5.5 9 5.94772 9 6.5C9 7.05228 9.44771 7.5 10 7.5H17C17.5523 7.5 18 7.05228 18 6.5C18 5.94772 17.5523 5.5 17 5.5H10ZM9 11.5C9 10.9477 9.44771 10.5 10 10.5H15C15.5523 10.5 16 10.9477 16 11.5C16 12.0523 15.5523 12.5 15 12.5H10C9.44771 12.5 9 12.0523 9 11.5ZM10 15.5C9.44771 15.5 9 15.9477 9 16.5C9 17.0523 9.44771 17.5 10 17.5H13C13.5523 17.5 14 17.0523 14 16.5C14 15.9477 13.5523 15.5 13 15.5H10Z"
                fill="#000000"
            />
        </svg>
    );
};

export const AddNewItemIcon = () => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.25 0.550537H5.75V5.55054H0.75V8.05054H5.75V13.0505H8.25V8.05054H13.25V5.55054H8.25V0.550537Z" fill="white" />
        </svg>
    );
};

export const KebabIcon: React.FC<PropsType> = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 26 6" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 -4.41063e-07C4.65685 -4.21305e-07 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 1.60169e-08 4.65685 3.57746e-08 3C5.55324e-08 1.34315 1.34315 -4.6082e-07 3 -4.41063e-07ZM13 1.55023e-07C14.6569 1.74781e-07 16 1.34315 16 3C16 4.65685 14.6569 6 13 6C11.3431 6 10 4.65685 10 3C10 1.34315 11.3431 1.35266e-07 13 1.55023e-07ZM26 3C26 1.34315 24.6569 -1.82807e-07 23 -2.02565e-07C21.3431 -2.22323e-07 20 1.34315 20 3C20 4.65685 21.3431 6 23 6C24.6569 6 26 4.65685 26 3Z"
                fill="#000000"
            />
        </svg>
    );
};

export const EditIcon = () => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_6072)">
                    <path
                        d="M1 11.9124V13.9981C1 14.2743 1.22386 14.4981 1.5 14.4981H3.58579C3.851 14.4981 4.10536 14.3928 4.29289 14.2053L11.4381 7.06006L8.43808 4.06006L1.29289 11.2052C1.10536 11.3928 1 11.6471 1 11.9124Z"
                        fill="black"
                        fill-opacity="0.87"
                    />
                    <path
                        d="M13.5808 4.91738L12.5099 5.98825L9.50989 2.98825L10.5808 1.91738C11.0884 1.4097 11.9116 1.4097 12.4192 1.91738L13.5808 3.0789C14.0884 3.58659 14.0884 4.4097 13.5808 4.91738Z"
                        fill="black"
                        fill-opacity="0.87"
                    />
                    <path
                        d="M8.5 12.4982C7.94772 12.4982 7.5 12.9459 7.5 13.4982C7.5 14.0505 7.94772 14.4982 8.5 14.4982H15C15.5523 14.4982 16 14.0505 16 13.4982C16 12.9459 15.5523 12.4982 15 12.4982H8.5Z"
                        fill="black"
                        fill-opacity="0.87"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_0_6072">
                        <rect width="16" height="16" fill="white" transform="translate(0 0.498047)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export const DeleteIcon = () => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_6082)">
                    <g clip-path="url(#clip1_0_6082)">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.25003 3.74805V2.74805C4.25003 1.64348 5.14546 0.748047 6.25003 0.748047H9.75003C10.8546 0.748047 11.75 1.64348 11.75 2.74805V3.74805H14.2505C14.6648 3.74805 15.0005 4.08383 15.0005 4.49805C15.0005 4.91226 14.6648 5.24805 14.2505 5.24805H13.682L12.8814 13.4294C12.7664 14.6048 11.7985 15.4999 10.6426 15.4999H5.35752C4.20158 15.4999 3.2337 14.6048 3.11868 13.4294L2.31809 5.24805H1.74951C1.3353 5.24805 0.999512 4.91226 0.999512 4.49805C0.999512 4.08383 1.3353 3.74805 1.74951 3.74805H4.25003ZM5.75003 2.74805C5.75003 2.4719 5.97389 2.24805 6.25003 2.24805H9.75003C10.0262 2.24805 10.25 2.4719 10.25 2.74805V3.74805H5.75003V2.74805ZM6.50003 6.37293C6.84521 6.37293 7.12503 6.65276 7.12503 6.99793V11.9985C7.12503 12.3436 6.84521 12.6235 6.50003 12.6235C6.15485 12.6235 5.87503 12.3436 5.87503 11.9985V6.99793C5.87503 6.65276 6.15485 6.37293 6.50003 6.37293ZM10.125 6.99793C10.125 6.65276 9.84521 6.37293 9.50003 6.37293C9.15485 6.37293 8.87503 6.65276 8.87503 6.99793V11.9985C8.87503 12.3436 9.15485 12.6235 9.50003 12.6235C9.84521 12.6235 10.125 12.3436 10.125 11.9985V6.99793Z"
                            fill="#222222"
                        />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_0_6082">
                        <rect width="16" height="16" fill="white" transform="translate(0 0.498047)" />
                    </clipPath>
                    <clipPath id="clip1_0_6082">
                        <rect width="16" height="16" fill="white" transform="translate(0 0.498047)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export const DownloadIcon = (props: {onClick: () => void }) => {
    return (
        <svg onClick={props.onClick} width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" fill="#000000"
                  d="M12.7071 10.7071C13.0976 10.3166 13.0976 9.68342 12.7071 9.29289C12.3166 8.90237 11.6834 8.90237 11.2929 9.29289L10 10.5858V1C10 0.447715 9.55229 2.98023e-08 9 0C8.44772 -1.49012e-08 8 0.447715 8 1L8 10.5858L6.70711 9.29289C6.31658 8.90237 5.68342 8.90237 5.29289 9.29289C4.90237 9.68342 4.90237 10.3166 5.29289 10.7071L8.29289 13.7071C8.68342 14.0976 9.31658 14.0976 9.70711 13.7071L12.7071 10.7071ZM18 11C18 10.4477 17.5523 10 17 10C16.4477 10 16 10.4477 16 11V16L2 16L2 11C2 10.4477 1.55229 10 1 10C0.447716 10 0 10.4477 0 11V17C0 17.5523 0.447715 18 1 18H17C17.5523 18 18 17.5523 18 17V11Z"/>
        </svg>
    );
};

export const EmptyList = () => {
    return (
        <div>
            <svg width="122" height="137" viewBox="0 0 122 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.44751" y="18.5389" width="68.0312" height="79.6937" rx="17.4937" transform="rotate(-15 0.44751 18.5389)" fill="#2291FF" />
                <g opacity="0.3" filter="url(#filter0_f_11160_21)">
                    <rect x="31.7034" y="39.512" width="69.975" height="77.75" rx="17.4937" fill="#2291FF" />
                </g>
                <g filter="url(#filter1_b_11160_21)">
                    <rect x="29.7595" y="22.9901" width="69.975" height="81.6375" rx="17.4937" fill="url(#paint0_linear_11160_21)" />
                </g>
                <path d="M43.366 50.2026H86.1285" stroke="#222222" strokeWidth="1.94375" strokeLinecap="round" />
                <path d="M43.366 60.8932H70.5785" stroke="#222222" strokeWidth="1.94375" strokeLinecap="round" />
                <circle cx="88.0719" cy="96.8526" r="21.3813" fill="#2291FF" />
                <path
                    d="M78.8391 96.8526L83.7806 102.139C85.0028 103.446 87.1036 103.354 88.2066 101.945L98.2766 89.0776"
                    stroke="white"
                    strokeWidth="1.94375"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <defs>
                    <filter
                        id="filter0_f_11160_21"
                        x="12.2659"
                        y="20.0745"
                        width="108.85"
                        height="116.625"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="9.71875" result="effect1_foregroundBlur_11160_21" />
                    </filter>
                    <filter
                        id="filter1_b_11160_21"
                        x="15.1814"
                        y="8.41199"
                        width="99.1313"
                        height="110.794"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImage" stdDeviation="7.28906" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_11160_21" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_11160_21" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_11160_21" x1="76.3765" y1="79.3099" x2="35.806" y2="28.934" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity="0.8" />
                        <stop offset="1" stopColor="white" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>
            <p>
                Активных списков нет,
                <br />
                добавьте новый список покупок
            </p>
        </div>
    );
};

export const ShoppingBag = () => {
    return (
        <div>
            <svg width="156" height="155" viewBox="0 0 156 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_5777)">
                    <path
                        d="M24.9448 48.8943C24.4682 45.0647 26.8886 41.4702 30.6162 40.4714L73.6226 28.9478C77.3502 27.949 81.2435 29.8518 82.7457 33.4066L104.014 83.7387C105.841 88.0616 103.426 93.0018 98.8934 94.2165L41.3654 109.631C36.8323 110.846 32.2712 107.775 31.6917 103.117L24.9448 48.8943Z"
                        fill="#2291FF"
                    />
                    <path
                        d="M40.2194 50.0442L38.1007 42.1371C35.9512 34.1153 40.896 25.8204 49.1452 23.61C57.3944 21.3997 65.8242 26.1108 67.9736 34.1327L70.0923 42.0397"
                        stroke="#222222"
                        stroke-width="1.93292"
                        stroke-linecap="round"
                    />
                    <circle cx="40.2296" cy="50.0955" r="2.41615" transform="rotate(-15 40.2296 50.0955)" fill="#222222" />
                    <circle cx="70.0759" cy="41.9784" r="2.41578" transform="rotate(-15 70.0759 41.9784)" fill="#222222" />
                    <g opacity="0.3" filter="url(#filter0_f_0_5777)">
                        <path
                            d="M67.7692 76.1328C68.3265 72.1892 71.7017 69.2574 75.6845 69.2574H120.252C124.235 69.2574 127.61 72.1892 128.168 76.1328L135.651 129.092C136.331 133.904 132.596 138.205 127.736 138.205H68.2011C63.3413 138.205 59.6058 133.904 60.2858 129.092L67.7692 76.1328Z"
                            fill="#2291FF"
                        />
                    </g>
                    <g filter="url(#filter1_b_0_5777)">
                        <path
                            d="M62.577 63.6893C63.1079 59.8669 66.3761 57.0212 70.2352 57.0212H114.759C118.618 57.0212 121.886 59.8669 122.417 63.6893L129.934 117.811C130.579 122.46 126.969 126.606 122.276 126.606H62.7183C58.0252 126.606 54.4145 122.46 55.0601 117.811L62.577 63.6893Z"
                            fill="url(#paint0_linear_0_5777)"
                        />
                    </g>
                    <path
                        d="M77.0336 68.6187V73.0468C77.0336 80.7427 83.9568 86.9815 92.4969 86.9815C101.037 86.9815 107.96 80.7427 107.96 73.0468V68.6187"
                        stroke="#222222"
                        stroke-width="1.93292"
                        stroke-linecap="round"
                    />
                    <circle cx="77.0172" cy="68.7578" r="2.41697" fill="#222222" />
                    <circle cx="107.961" cy="68.7578" r="2.41697" fill="#222222" />
                </g>
                <defs>
                    <filter
                        id="filter0_f_0_5777"
                        x="40.2209"
                        y="49.2726"
                        width="115.495"
                        height="108.917"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="9.99237" result="effect1_foregroundBlur_0_5777" />
                    </filter>
                    <filter
                        id="filter1_b_0_5777"
                        x="39.9967"
                        y="42.0327"
                        width="105.001"
                        height="99.5623"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImage" stdDeviation="7.49428" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_5777" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_5777" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_0_5777" x1="115.402" y1="115.142" x2="68.7586" y2="57.7855" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0.8" />
                        <stop offset="1" stop-color="white" stop-opacity="0.3" />
                    </linearGradient>
                    <clipPath id="clip0_0_5777">
                        <rect width="154.634" height="154.634" fill="white" transform="translate(0.683105)" />
                    </clipPath>
                </defs>
            </svg>
            <p>
                Пока пусто, начните
                <br />
                добавлять позиции в список
            </p>
        </div>
    );
};
