import SwitchComponent from "../form/elements/switch/SwitchComponent";

export const switchColumn = (defaultStatus, props, id) => {
    return <SwitchComponent
            disabled={!!props.switchLoading}
            defaultChecked={!!defaultStatus}
            id={`active-${id}`}
            onChange={(checked) => props.changeStatus(id, checked)}
        />
}