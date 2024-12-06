import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

export class ChartHelper {
    static generateChartDataByRanges(
        stats: StatRangeData[][],
        headerData: string[][],
        isComparedRange: boolean = true
    ): any[][] {
        let statsData: any[] = headerData;
        for (let index in stats[0]) {
            statsData.push([]);
        }
        const totalResponses: number = stats.length;
        for (let index in stats[0]) {
            let title: string = '';
            if (isComparedRange) {
                for (let i = 0; i < totalResponses; i++) {
                    if (typeof stats[i][index] != 'undefined') {
                        title += `(${stats[i][index].rangeStart} - ${stats[i][index].rangeEnd}) vs `;
                    }
                }
                title = title.substring(0, title.length - 4);
            } else {
                //title += `(${stats[0][index].rangeStart} - ${stats[0][index].rangeEnd})`;
                title += `${stats[0][index].rangeStart}`;
            }
            statsData[parseInt(index) + 1].push(title);
            for (let i = 0; i < totalResponses; i++) {
                if (typeof stats[i][index] != 'undefined') {
                    statsData[parseInt(index) + 1].push(stats[i][index].value);
                } else {
                    statsData[parseInt(index) + 1].push(0);
                }
            }
        }
        return statsData;
    }

    static getDefaultChartsData(): ContainerCharts {
        return {
            insurers: null,
            insurances: null,
            contactTypes: null,
        };
    }
}
