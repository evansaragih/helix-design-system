import { Search, Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Header({ isCollapsed, onToggleCollapse }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme)!;
  const CurrentIcon = currentTheme.icon;

  return (
    <header
      className="fixed top-0 right-0 bg-white flex items-center z-10"
      style={{
        left: isCollapsed ? '64px' : '240px',
        height: '64px',
        borderBottom: '1px solid var(--color-stroke-subtle)',
        padding: '0 var(--spacing-32)',
        gap: 'var(--spacing-16)',
        transition: 'left 0.3s ease'
      }}
    >
      <button
        onClick={onToggleCollapse}
        className="flex items-center justify-center transition-colors"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'transparent',
          border: '1px solid var(--color-stroke-subtle)',
          cursor: 'pointer',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
          e.currentTarget.style.color = 'var(--color-text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-text-secondary)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="3.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12.5 3.5V16.5" stroke="currentColor" strokeWidth="1.5"/>
          {isCollapsed ? (
            <path d="M7 7.5L9.5 10L7 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <path d="M9.5 7.5L7 10L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
      </button>
      <div className="flex-1" style={{ maxWidth: '448px' }}>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--color-text-tertiary)' }}
          />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full"
            style={{
              paddingLeft: 'var(--spacing-40)',
              paddingRight: 'var(--spacing-16)',
              paddingTop: 'var(--spacing-8)',
              paddingBottom: 'var(--spacing-8)',
              border: '1px solid var(--color-input-border-default)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-body-default)',
              fontFamily: 'var(--font-family-body)',
              color: 'var(--color-input-text-default)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-border-focus)';
              e.target.style.boxShadow = '0 0 0 3px rgba(245, 126, 32, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-input-border-default)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center transition-colors"
          style={{
            gap: 'var(--spacing-8)',
            padding: 'var(--spacing-8) var(--spacing-12)',
            border: '1px solid var(--color-stroke-subtle)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-body-default)',
            fontFamily: 'var(--font-family-body)',
            color: 'var(--color-text-primary)',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <CurrentIcon className="w-4 h-4" />
          <span>{currentTheme.label}</span>
        </button>

        {isDropdownOpen && (
          <div
            className="absolute right-0 bg-white overflow-hidden"
            style={{
              marginTop: 'var(--spacing-8)',
              width: '160px',
              border: '1px solid var(--color-stroke-subtle)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center transition-colors"
                  style={{
                    gap: 'var(--spacing-8)',
                    padding: 'var(--spacing-8) var(--spacing-16)',
                    fontSize: 'var(--text-body-default)',
                    fontFamily: 'var(--font-family-body)',
                    backgroundColor: isActive ? 'rgba(245, 126, 32, 0.1)' : 'transparent',
                    color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
