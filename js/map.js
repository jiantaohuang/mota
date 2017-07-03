////////////////////////////
//////////地图//////////////
////////////////////////////
class GameMap{
	constructor(storeyNum){
		this.storey = StoreyAttr[`storey${storeyNum}`] || [];
		this.storeyList = new Map();
		this.storeyCreepList = new Map();
		this.storeyItemList = new Map();
		this.creepsMap = new Map();
		this.itemsMap = new Map();
		if(this.storey){
			this.storeyList.set(`storey${storeyNum}`,this.storey);
			this.storeyCreepList.set(`storeyCreep${storeyNum}`,this.storeyCreep);
			this.storeyItemList.set(`storeyItem${storeyNum}`,this.storeyItem);
			this.draw();
		}
	}
	/////////////////////////
	/// -1  异常、出界
	///  0  平地
	///  1  墙
	/////////////////////////
	isAction(x,y){
		let action = -1;
		if(this.storey[x]){
			action = this.storey[x][y];
		}
		if(undefined === action){
			action = -1;
		}
		return action;
	}
	setStorey(storey){
		
	}
	getCreep(row,col){
		return this.creepsMap.get(`${row}-${col}`);
	}
	getItem(row,col){
		return this.itemsMap.get(`${row}-${col}`);
	}
	deleteCreep(row,col){
		this.getCreep(row,col).redraw();
		this.storey[row][col] = 0;
		return this.creepsMap.delete(`${row}-${col}`);
	}
	deleteItem(row,col){
		this.getItem(row,col).redraw();
		this.storey[row][col] = 0;
		return this.itemsMap.delete(`${row}-${col}`);
	}
	draw(){
		this.redraw();
		
		this.storey.map((line,row) => {
			line.map((value,col) => {
				let block = document.createElement('div');
				if(value < 100){
					block.className = `block block${value}`;   
				}else{
					block.className = `block block0`;
					if(value < 200){
						this.drawCreep(row,col,Storey.StoreyEnum(value));
					}else if(value < 300){
						this.drawItem(row,col,Storey.StoreyEnum(value));
					}
				}
				block.style.top = row * config.unitSize +'px';
				block.style.left = col * config.unitSize +'px';
				config.area.appendChild(block);
			})
		})
	}
	drawItem(row,col,type){
		let it = new Item(row,col,type);
		this.itemsMap.set(`${row}-${col}`,it);
	}
	drawCreep(row,col,type){
		let m = new Creep(row,col,type);
		this.creepsMap.set(`${row}-${col}`,m);
	}
	drawScoreboard(options){
		//画计分板
		let sb = document.querySelector('.scoreboard');
		for(let opt in options){
			let temp = sb.querySelector(`.${opt}`);
			if(temp){
				if(typeof(options[opt]) !== 'object'){
					temp.innerText = options[opt];
				}else{
					for(let key in options[opt]){
						temp = sb.querySelector(`.${key}`);
						if(temp){
							temp.innerText = options[opt][key];
						}
					}
				}
			}
		}
	}
	redraw(){

	}
}




