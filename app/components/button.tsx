export const CustomHeaderButton = ({link, icon}:{link: string, icon: any}) => {
    return (
        <a href={link} className='customHeaderButton'>
            {icon}
        </a>
    )
}