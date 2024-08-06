'use client'
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IActionButtonProps<A, P> extends ButtonProps {
    action?: A
    actionParams?: P
    text?: string
    redirectUrl?: string

}

function ActionButton<A extends Function, P>(props: IActionButtonProps<A, P>) {
    const router = useRouter();
    return (
        <Button
            {...props}
            onClick={async () => {
                if (props.action) await props.action(props.actionParams)
                if (props.redirectUrl) router.push(props.redirectUrl)
            }
            }
        >
            {props.text}
        </Button>
    );
}

export default ActionButton;