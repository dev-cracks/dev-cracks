import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from './Avatar';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAccountClick = () => {
    setIsOpen(false);
    navigate('/account');
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  if (!user) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="user-menu__avatar">
          <Avatar
            picture={user.picture}
            name={user.name}
            email={user.email}
            userId={user.id}
            size="small"
          />
        </div>
        <span className="user-menu__name">{user.name || user.email}</span>
        <svg
          className={`user-menu__chevron ${isOpen ? 'user-menu__chevron--open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="user-menu__dropdown">
          <div className="user-menu__header">
            <div className="user-menu__header-avatar">
              <Avatar
                picture={user.picture}
                name={user.name}
                email={user.email}
                userId={user.id}
                size="medium"
              />
            </div>
            <div className="user-menu__header-info">
              <div className="user-menu__header-name">{user.name || 'Usuario'}</div>
              <div className="user-menu__header-email">{user.email}</div>
            </div>
          </div>

          <div className="user-menu__divider"></div>

          <div className="user-menu__items">
            <button
              className="user-menu__item"
              onClick={handleAccountClick}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 9C11.4853 9 13.5 6.98528 13.5 4.5C13.5 2.01472 11.4853 0 9 0C6.51472 0 4.5 2.01472 4.5 4.5C4.5 6.98528 6.51472 9 9 9Z"
                  fill="currentColor"
                />
                <path
                  d="M9 10.5C4.85775 10.5 1.5 12.1785 1.5 14.25V18H16.5V14.25C16.5 12.1785 13.1423 10.5 9 10.5Z"
                  fill="currentColor"
                />
              </svg>
              <span>Account</span>
            </button>

            <button
              className="user-menu__item user-menu__item--logout"
              onClick={handleLogout}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 15.75H3.375C2.87772 15.75 2.40081 15.5525 2.04917 15.2008C1.69754 14.8492 1.5 14.3723 1.5 13.875V4.125C1.5 3.62772 1.69754 3.15081 2.04917 2.79917C2.40081 2.44754 2.87772 2.25 3.375 2.25H6.75M12.75 13.5L16.5 9M16.5 9L12.75 4.5M16.5 9H6.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

