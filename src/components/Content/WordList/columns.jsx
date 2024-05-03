export const columnDef = [
    {
        accessorKey: 'english',
        header: 'english word'
    },
    {
        accessorKey: 'transcription',
        header: 'транскрипция'
    },
    {
        accessorKey: 'russian',
        header: 'перевод'
    },
    {
        accessorKey: 'editButton', //        accessorFn: (row) => `${row.editButton} ${row.deleteButton}`,
        header: 'editButton'
    },
    {
        accessorKey: 'deleteButton',
        header: 'deleteButton',
        cell: ((getValue) => {
            console.log('deleteButton')
        })
    },
    {
        accessorKey: 'cancelEditButton',
        header: 'cancelEditButton'
    },
];