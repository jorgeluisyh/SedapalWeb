import { Tag } from 'primereact/tag'

interface ArcgisServiceStatusTagProps {
  status: number
}

export const ArcgisServiceStatusTag = ({
  status,
}: ArcgisServiceStatusTagProps) => {
  const getSeverity = () => {
    switch (status) {
      case 1:
        return 'info'
      case 2:
        return null
      case 3:
        return 'success'
      default:
        return null
    }
  }
  const getTextValue = () => {
    switch (status) {
      case 1:
        return 'Cacheado'
      case 2:
        return 'Dinámico'
      case 3:
        return 'MXD'
      default:
        return 'Default'
    }
  }
  const textValue = getTextValue()
  const severity = getSeverity()

  return (
    <Tag
      value={textValue}
      severity={severity}
      style={severity === null ? { backgroundColor: 'gray' } : {}}
    />
  )
}
