import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {

    private _life: number = 10;

    private _birth: number = 0;

    start() {
        console.log("boom")
    }

    protected onLoad(): void {
        console.log("load")
    }

    update(deltaTime: number) {
        this._birth += deltaTime
        if (this._birth > this._life){
            this.node.parent.removeChild(this.node)
        }
    }
}


