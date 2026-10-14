//searchTerm contiene valor actual de búsqueda, 
export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full max-w-md mx-auto mb-6 px-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="🔍 Buscar por nombre..."
          className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border-card)] rounded-xl text-sm text-[var(--color-on-surface)] placeholder-[var(--color-on-surface-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-xs transition-colors"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] text-xs font-bold"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
}