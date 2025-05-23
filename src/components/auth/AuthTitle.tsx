interface AuthTitleProps {
  subtitle: string;
}

export function AuthTitle({ subtitle }: AuthTitleProps) {
  return (
    <div className='text-left'>
      <h1 className='font-poppins text-[25px] font-light text-black'>
        Welcome to Snapcode!
      </h1>
      <h2 className='font-pretendard text-[35px] font-bold text-black mt-2'>
        {subtitle}
      </h2>
    </div>
  );
}
