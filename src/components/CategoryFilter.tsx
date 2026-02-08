import { motion } from 'framer-motion'
import { categories } from '../data/questions'

interface CategoryFilterProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export default function CategoryFilter({ selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-6xl"
    >
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-md ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground scale-105'
                : 'bg-card hover:bg-accent text-foreground border-2 border-border'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
