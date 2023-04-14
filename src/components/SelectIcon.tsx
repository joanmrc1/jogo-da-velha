interface SelectIconProps {
  label: string,
  iconName: string,
  icon: React.ReactElement,
  selected: (iconName: string) => void
}

const SelectIcon: React.FC<SelectIconProps> = ({ label, iconName, icon, selected }) => {
  return (
    <>
      <div
        className="
        flex
        p-2
        hover:cursor-pointer
        hover:bg-slate-900
      hover:text-white
        border
        mx-2"
        onClick={() => selected(iconName)}
      >
        <span className="p-2 m-2 font-mono">
          {label}
        </span>

        {icon}
      </div>
    </>
  )
}

export default SelectIcon;