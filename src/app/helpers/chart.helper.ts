import { RangeStat } from '@interfaces/range-stat.interface';

export class ChartHelper {

    static generateChartDataByRanges(stats: RangeStat[][], headerData: string[][]): any[][] {
        let statsData: any[] = headerData;
        for (let index in stats[0]) {
            statsData.push([]);
        }
        const totalResponses: number = stats.length;
        for (let index in stats[0]) {
            let title: string = '';
            for(let i=0; i<totalResponses; i++) {
                if(typeof stats[i][index] != 'undefined') {
                    title += `(${stats[i][index].rangeStart} - ${stats[i][index].rangeEnd}) vs `;
                }
            }
            title = title.substring(0, title.length - 4);
            statsData[parseInt(index) + 1].push(title);
            for(let i=0; i<totalResponses; i++) {
                if(typeof stats[i][index] != 'undefined') {
                    statsData[parseInt(index) + 1].push(stats[i][index].value);
                } else {
                    statsData[parseInt(index) + 1].push(0);
                }
            }
        }
        return statsData;
    }
}
