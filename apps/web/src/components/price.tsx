const Price = ({
    amount,
    currencyCode = 'USD',
    ...props
}: {
    amount: number
    currencyCode: string
} & React.ComponentProps<'p'>) => (
    <p suppressHydrationWarning={true} {...props}>
        {`${new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'narrowSymbol',
        }).format(amount/100)} ${currencyCode}`}
    </p>
)

export default Price
