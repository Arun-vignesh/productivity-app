const brand = {
  primary: '#3B82F6',       // Blue-500
  primaryDark: '#2563EB',   // Blue-600
  accent: '#F59E0B',        // Amber-500
  accentDark: '#D97706',    // Amber-600
}

const lightTheme = {
  background: '#F9FAFB',     // Gray-50
  surface: '#FFFFFF',        // White
  textPrimary: '#111827',    // Gray-900
  textSecondary: '#6B7280',  // Gray-500
  border: '#E5E7EB',         // Gray-200
  taskUrgent: '#EF4444',     // Red-500
  taskImportant: '#10B981',  // Green-500
}

const darkTheme = {
  background: '#0F172A',     // Slate-900
  surface: '#1E293B',        // Slate-800
  textPrimary: '#F8FAFC',    // Slate-50
  textSecondary: '#94A3B8',  // Slate-400
  border: '#334155',         // Slate-700
  taskUrgent: '#F87171',     // Red-400
  taskImportant: '#34D399',  // Green-400
}

const statusColors = {
  completed: '#10B981',      // Green-500
  inProgress: '#3B82F6',     // Blue-500
  pending: '#FBBF24',        // Yellow-400
  deleted: '#EF4444',        // Red-500
  pomodoroRed: '#DC2626',    // Red-600
  batchingTag: '#6366F1',    // Indigo-500
}

const theme = {
  brand,
  light: lightTheme,
  dark: darkTheme,
  status: statusColors,
}

export default theme 