export const CustomHeaderButton = ({link, icon}:{link: string, icon: React.ReactNode}) => {
    return (
        <a className='navLinks' href={link} >
            {icon}
        </a>
    )
}