import { format, register } from 'timeago.js'
import pt_BR from 'timeago.js/lib/lang/pt_BR'

// Register Brazilian Portuguese locale
register('pt-BR', pt_BR)

export class DateFormatter {
  static toLocaleString(val: string | number | Date | null | undefined, locale = 'pt-BR'): string {
    if (!val) return ''
    const date = new Date(val)
    return isNaN(date.getTime()) ? '' : date.toLocaleString(locale)
  }

  static toLocaleDateString(val: string | number | Date | null | undefined): string {
    if (!val) return ''
    const date = new Date(val)
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString()
  }

  static toLocaleTimeString(val: string | number | Date | null | undefined): string {
    if (!val) return ''
    const date = new Date(val)
    return isNaN(date.getTime()) ? '' : date.toLocaleTimeString()
  }

  static format(
    val: string | number | Date | null | undefined,
    format: Intl.DateTimeFormatOptions,
  ): string {
    if (!val) return ''
    const date = new Date(val)
    return isNaN(date.getTime()) ? '' : date.toLocaleString(undefined, format)
  }

  static timeAgo(val: string | number | Date | null | undefined, locale = 'pt-BR'): string {
    if (!val) return ''
    const date = new Date(val)
    return isNaN(date.getTime()) ? '' : format(date, locale === 'pt-BR' ? 'pt-BR' : 'en-US')
  }
}
