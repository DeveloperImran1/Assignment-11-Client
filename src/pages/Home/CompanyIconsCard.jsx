
const CompanyIconsCard = ({icon}) => {

    return (
        <div className="mr-[30px]">
            <img className="w-[150px] lg:w-[170px] h-[70px] lg:h-[90px]" src={icon.image} alt="" />
        </div>
    );
};

export default CompanyIconsCard;