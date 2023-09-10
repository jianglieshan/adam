import { _decorator, Component, log, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationController')
export class AnimationController extends Component {
    private _index = 0
    private _cur: Vec3 = new Vec3()
    start() {
    }

    update(deltaTime: number) {
        if(this._cur == null){
            this.node.getPosition(this._cur)
        }

        let target = new Vec3(0, 0, 0)
        if(this._index == 8){
            this._index = 0
        }
        Vec3.add(target, this._cur, new Vec3(-552.5 * this._index,0, 0));
        this.node.setPosition(target);
        this._index += 1    
    }
}


