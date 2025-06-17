import { Tag } from 'primereact/tag'

interface Props {
  status: string
}

export const ArcgisServiceStatusTag = ({ status }: Props) => {
  const getSeverity = () => {
    switch (status) {
      case 'Cacheado':
        return 'info'
      case 'Dinámico':
        return null
      case 'MXD':
        return 'success'
      default:
        return null
    }
  }

  const severity = getSeverity()

  return (
    <Tag
      value={status}
      severity={severity}
      style={severity === null ? { backgroundColor: 'gray' } : {}}
    />
  )
}
