// The div that will render other components onto it 
export default function Card({ children, props = {} }) {
    const className = props.className ? `card ${props.className}` : 'card';

    return (
        <div {...props} className={className}>
            {children}
        </div>
    )
}