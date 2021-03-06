import type { NextPage } from 'next';

const IndexPage: NextPage = () => {
  return (
    <div>
      Home Next
      <svg
        className="w-96 h-96"
        width="35"
        height="40"
        viewBox="0 0 35 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3205 40L34.641 30L17.3205 20L0 30L17.3205 40Z"
          fill="#1E293B"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.3205 0L34.641 10L17.3205 20L0 30V10L17.3205 0Z"
          fill="#0F172A"
        />
        <path d="M34.641 30V10L17.3205 20L34.641 30Z" fill="#334155" />
        <path
          d="M24.0653 11.5455V29H21.2528L13.0284 17.1108H12.8835V29H9.72159V11.5455H12.5511L20.767 23.4432H20.9205V11.5455H24.0653Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default IndexPage;
