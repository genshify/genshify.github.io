import { Pagination, Typography } from '@mui/material'
import type { TFunction } from 'i18next'
import { Trans } from 'react-i18next'
import SortByButton from '../Components/SortByButton'

type PaginationProps = {
  count: number
  page: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (_: any, value: number) => void
}

type ShowingItemProps = {
  numShowing: number
  total: string
  t: TFunction<[string, string], undefined>
  namespace: string
}

type SortByButtonProps = {
  sortKeys: string[]
  value: string
  onChange: (value: string) => void
  ascending: boolean
  onChangeAsc: (value: boolean) => void
}

export default function PageAndSortOptionSelect({
  paginationProps,
  showingTextProps,
  displaySort = false,
  sortByButtonProps = undefined,
}: {
  paginationProps: PaginationProps
  showingTextProps: ShowingItemProps
  displaySort?: boolean
  sortByButtonProps?: SortByButtonProps
}) {
  return (
    <>
      <Pagination
        count={paginationProps.count}
        page={paginationProps.page}
        onChange={paginationProps.onChange}
      />
      <ShowingItem
        numShowing={showingTextProps.numShowing}
        total={showingTextProps.total}
        t={showingTextProps.t}
        namespace={showingTextProps.namespace}
      />
      {displaySort && sortByButtonProps && (
        <SortByButton
          sortKeys={sortByButtonProps.sortKeys}
          value={sortByButtonProps.value}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(value) => sortByButtonProps.onChange(value as any)}
          ascending={sortByButtonProps.ascending}
          onChangeAsc={sortByButtonProps.onChangeAsc}
        />
      )}
    </>
  )
}

function ShowingItem({
  numShowing,
  total,
  t,
  namespace,
}: {
  numShowing: number
  total: string
  t: TFunction<[string, string], undefined>
  namespace: string
}) {
  return (
    <Typography color="text.secondary">
      <Trans
        t={t}
        ns={namespace}
        i18nKey="showingNum"
        count={numShowing}
        value={total}
      >
        Showing <b>{{ count: numShowing } as TransObject}</b> out of{' '}
        {{ value: total } as TransObject} Items
      </Trans>
    </Typography>
  )
}
