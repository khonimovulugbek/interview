import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl"
    >
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <input
        type="text"
        placeholder="Savollarni qidiring..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border-2 border-border focus:border-primary focus:outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground shadow-lg"
      />
    </motion.div>
  )
}
