import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const headerClasses = transparent
    ? 'w-full py-3 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50'
    : 'w-full py-3 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50';

  const navClasses = transparent
    ? 'max-w-[1596px] mx-auto px-4 sm:px-8 lg:px-[34px] py-3 flex justify-between items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md'
    : 'max-w-[1596px] mx-auto px-4 sm:px-8 lg:px-[34px] py-3 flex justify-between items-center rounded-full border border-[#262626] bg-[#1C1C1C]';

  return (
    <header
      className={`${headerClasses} transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className={navClasses}>
        {/* Logo - Left */}
        <div className='flex items-center flex-shrink-0 relative z-10'>
          <Link
            to='/'
            className='text-xl sm:text-2xl font-pretendard font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent'
          >
            SnapCode
          </Link>
        </div>

        {/* Center Navigation - Business & Personal */}
        <div className='hidden sm:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2 z-10'>
          <Link
            to='/'
            className='text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200'
            style={{ fontFamily: 'Lexend' }}
          >
            Home
          </Link>
          <Link
            to='/custom'
            className='text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200'
            style={{ fontFamily: 'Lexend' }}
          >
            Business
          </Link>
          <Link
            to='/personal'
            className='text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200'
            style={{ fontFamily: 'Lexend' }}
          >
            Personal
          </Link>
        </div>

        {/* Right Navigation - MyPage & Logout */}
        <div className='hidden sm:flex items-center space-x-4 lg:space-x-6 relative z-10'>
          {isAuthenticated ? (
            <>
              <Link
                to='/mypage'
                className='text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200'
                style={{ fontFamily: 'Lexend' }}
              >
                MyPage
              </Link>
              <button
                onClick={logout}
                className='text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200'
                style={{ fontFamily: 'Lexend' }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              className='text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200'
              style={{ fontFamily: 'Lexend' }}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className='flex items-center sm:hidden relative z-10'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className='absolute top-full left-4 right-4 mt-2 sm:hidden z-50'>
            <div className='bg-[#1C1C1C] border border-[#262626] rounded-2xl px-4 py-3 space-y-2'>
              <Link
                to='/'
                className='block text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200 rounded-lg hover:bg-[#262626]'
                style={{ fontFamily: 'Lexend' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to='/custom'
                className='block text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200 rounded-lg hover:bg-[#262626]'
                style={{ fontFamily: 'Lexend' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Business
              </Link>
              <Link
                to='/personal'
                className='block text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200 rounded-lg hover:bg-[#262626]'
                style={{ fontFamily: 'Lexend' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Personal
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to='/mypage'
                    className='flex items-center text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200 rounded-lg hover:bg-[#262626]'
                    style={{ fontFamily: 'Lexend' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                    MyPage
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className='block w-full text-left text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200 rounded-lg hover:bg-[#262626]'
                    style={{ fontFamily: 'Lexend' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to='/login'
                  className='block text-gray-300 hover:text-white px-3 py-2 text-[18px] font-normal transition-colors duration-200 rounded-lg hover:bg-[#262626]'
                  style={{ fontFamily: 'Lexend' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
