export const CustomHeaderButton = ({link, icon}:{link: string, icon: any}) => {
    return (
        <a className='navLinks' href={link} >
            {icon}
        </a>
    )
}