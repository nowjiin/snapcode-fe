import { Container, ContainerGrid } from '../../components/custom/Container';
import { Button } from '../../components/custom/Button';
import { FeatureCard } from '../../components/custom/FeatureCard';

export function CustomPage() {
  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>
      {/* First Container - Orange Background */}
      <div className='w-full bg-[#FF7710] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <Container size='lg'>
          <div
            className='font-normal text-[#FFFFFF] text-center uppercase tracking-wide transition-all duration-500 ease-in-out'
            style={{
              fontFamily: 'Vina Sans',
              fontSize: 'clamp(3rem, 8vw, 15.625rem)',
              lineHeight: '0.664',
              letterSpacing: '0.5px',
            }}
          >
            <div
              className='text-left transition-all duration-300 ease-in-out'
              style={{ marginBottom: 'clamp(8rem, 20vw, 18.75rem)' }}
            >
              SNAPCODE
            </div>
            <div
              className='text-right transition-all duration-300 ease-in-out'
              style={{ marginBottom: 'clamp(1rem, 3vw, 3.125rem)' }}
            >
              LIKELION13TH
            </div>
          </div>
        </Container>
      </div>

      {/* Second Container - Black Background */}
      <div className='w-full bg-black py-16'>
        <Container size='lg'>
          <h2 className='text-white text-left text-4xl font-bold mb-8'>
            What is SNAPCODE?
          </h2>
          <ContainerGrid columns={3} className='max-w-5xl mx-auto gap-8'>
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
            PossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoRealityPossibilitytoReality
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
