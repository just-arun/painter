import { Vue, Component } from 'vue-property-decorator';

@Component({})
export class ArrayFunction extends Vue {


    private oC = (itm: any, key: any) =>
        typeof itm == "object"
            ? itm[key] : itm;

    private swap(items: any[], leftIndex: number, rightIndex: number) {
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }

    private partition(items: any[], left: number, right: number, key?: any) {
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;


        while (i <= j) {
            while (this.oC(items[i], key) < this.oC(pivot, key)) {
                i++;
            }
            while (this.oC(items[j], key) > this.oC(pivot, key)) {
                j--;
            }
            if (i <= j) {
                this.swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    public sortElements(items: any[], left: number, right: number, key?: any) {
        var index;
        if (items.length > 1) {
            index = this.partition(items, left, right, key);
            if (left < index - 1) {
                this.sortElements(items, left, index - 1, key);
            }
            if (index < right) {
                this.sortElements(items, index, right, key);
            }
        }
        return items;
    }

    public searchElements(array: any[], target: any, key: any): number | null {
        let startIndex = 0;
        let endIndex = array.length - 1;

        while (startIndex <= endIndex) {

            let middleIndex = Math.floor((startIndex + endIndex) / 2);

            if (target === this.oC(array[middleIndex], key)) {
                return middleIndex;
            }

            if (target > this.oC(array[middleIndex], key)) {
                startIndex = middleIndex + 1;
            }

            if (target < this.oC(array[middleIndex], key)) {
                endIndex = middleIndex - 1;
            }
        }

        return null;
    }
}


