import { _decorator, Component, Vec3, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _curPos: Vec3 = new Vec3();

    //movement calculated by deltaTime.
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);

    // store the final position of the player, when the player's jumping action ends, it will be used directly to avoid cumulative errors.
    private _targetPos: Vec3 = new Vec3();


    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(deltaTime: number) {
        this.node.setPosition(this._targetPos);
    }

    onKeyDown(event: EventKeyboard) {
        console.log(event)
        if (event.keyCode === KeyCode.ARROW_LEFT) {
            this.move(-1);
        } else if (event.keyCode === KeyCode.ARROW_RIGHT) {
            this.move(1);
        }
    }

    move(step: number) {
        console.log(step)
        this.node.getPosition(this._curPos)
        Vec3.add(this._targetPos, this._curPos, new Vec3(step, 0, 0));
    }
}


