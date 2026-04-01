// The div that will render other components onto it 
export default function Card({children, classname, rest}) {
    return (
        <div className={classname} {...rest}>
            {children}
        </div>
    )
}