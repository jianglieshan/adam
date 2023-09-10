import { _decorator, Component, Vec3, input, Input, EventKeyboard, KeyCode,Prefab,instantiate, game, Script } from 'cc';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property({type: Prefab})
    public bulletPrefab: Prefab|null = null;

    private _curPos: Vec3 = new Vec3();

    //movement calculated by deltaTime.
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);

    // store the final position of the player, when the player's jumping action ends, it will be used directly to avoid cumulative errors.
    private _targetPos: Vec3 = new Vec3();

    private _vertical: number = 0;

    private _horizontal: number = 0;

    private _speed: number = 50;

    protected onLoad(): void {
        game.frameRate = 30
    }

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        this.node.getParent().getPosition(this._curPos)
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._horizontal * deltaTime * this._speed, this._vertical * deltaTime * this._speed, 0));
        this.node.getParent().setPosition(this._targetPos)
    }

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_W) {
            this._vertical -= 1;
        } else if (event.keyCode === KeyCode.KEY_A) {
            this._horizontal += 1;
        } else if (event.keyCode === KeyCode.KEY_S) {
            this._vertical += 1;
        }else if (event.keyCode === KeyCode.KEY_D) {
            this._horizontal -= 1;
        }
    }


    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_W) {
            this._vertical += 1;
        } else if (event.keyCode === KeyCode.KEY_A) {
            this._horizontal -= 1;
        } else if (event.keyCode === KeyCode.KEY_S) {
            this._vertical -= 1;
        }else if (event.keyCode === KeyCode.KEY_D) {
            this._horizontal += 1;
        }else if (event.keyCode == KeyCode.SPACE){
            this.attack()
        }
    }

    attack(){
        var bulletNode = instantiate(this.bulletPrefab)
        bulletNode.addComponent("BulletController")
        bulletNode.setPosition(this.node.getParent().getPosition())
        this.node.getParent().getParent().addChild(bulletNode)
        console.log("attack !!!")
    }
}


