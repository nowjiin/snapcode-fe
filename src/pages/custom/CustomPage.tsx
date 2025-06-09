import { Container, ContainerGrid } from '../../components/common/Container';
import { Button } from '../../components/custom/Button';
import { FeatureCard } from '../../components/custom/FeatureCard';
import customBackground from '../../assets/background/custom_background.png';

export function CustomPage() {
  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>
      {/* First Container - Custom Background Image */}
      <div
        className='w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-cover bg-center bg-no-repeat relative flex flex-col justify-end items-center'
        style={{
          backgroundImage: `url(${customBackground})`,
          minHeight: '100vh',
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>

        <Container size='full' className='relative z-10'>
          <div
            className='w-full font-normal text-[#FFFFFF] uppercase tracking-wide transition-all duration-500 ease-in-out pb-8'
            style={{
              fontFamily: 'Vina Sans',
              fontSize: 'clamp(3rem, 8vw, 15.625rem)',
              lineHeight: '0.664',
              letterSpacing: '0.5px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            <div className='w-full'>
              <div className='text-left transition-all duration-300 ease-in-out mb-4'>
                SNAPCODE X
              </div>
              <div className='text-right transition-all duration-300 ease-in-out'>
                LIKELION13TH
              </div>
            </div>
            <div className='flex justify-center mt-8'>
              <div className='animate-bounce'>
                <svg
                  width='40'
                  height='40'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='text-white animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer'
                >
                  <path
                    d='M12 5V19M12 19L5 12M12 19L19 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Second Container - Black Background */}
      <div className='w-full bg-black py-16'>
        <Container size='lg'>
          <div className='max-w-5xl mx-auto'>
            <h2 className='text-white text-left text-4xl font-bold mb-8'>
              What is SNAPCODE?
            </h2>
            <ContainerGrid columns={3} className='gap-8'>
              <FeatureCard
                icon='chart'
                title='정확한 평가 기준으로!'
                description='명확한 평가 기준을 바탕으로 우리 팀의 프로덕트 코드를 br 심사받을 수 있어요.'
              />

              <FeatureCard
                icon='support'
                title='24/7 Support'
                description='Get round-the-clock support from our dedicated team of experts.'
              />

              <FeatureCard
                icon='analytics'
                title='Analytics Dashboard'
                description='Monitor your business performance with our comprehensive analytics tools.'
              />
            </ContainerGrid>
          </div>
        </Container>
      </div>

      {/* Orange Scrolling Line */}
      <div className='w-full bg-[#FF7710] py-7 overflow-hidden relative'>
        <div className='flex animate-scroll-seamless'>
          <div
            className='flex-shrink-0 text-center whitespace-nowrap'
            style={{
              color: '#000',
              fontFamily: 'Space Mono',
              fontSize: '28px',
              fontWeight: '700',
              lineHeight: '140%',
              letterSpacing: '-0.84px',
            }}
          >
            PossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoReality
          </div>
          <div
            className='flex-shrink-0 text-center whitespace-nowrap'
            style={{
              color: '#000',
              fontFamily: 'Space Mono',
              fontSize: '28px',
              fontWeight: '700',
              lineHeight: '140%',
              letterSpacing: '-0.84px',
            }}
          >
            PossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoReality
          </div>
        </div>
      </div>

      {/* Third Container - Button Section */}
      <div className='w-full bg-[#000000] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <Container size='lg'>
          <h1 className='text-white text-left text-4xl font-bold mb-4'>
            Use Cases
          </h1>
          <p className='text-white text-[#B3B3B3] text-left text-sm mb-8'>
            At YourBank, we cater to the diverse needs of individuals and
            businesses alike, offering a wide range of financial solutions
          </p>
          <FeatureCard
            icon='analytics'
            title='Analytics Dashboard'
            description='Monitor your business performance with our comprehensive analytics tools.'
          />
          <div className='flex justify-center'>
            <Button>
              <p>Get Started</p>
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
