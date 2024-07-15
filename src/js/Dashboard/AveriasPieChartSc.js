import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'AveriasPieChart',
  data() {
    return {
      averias: [],
      chart: null,
      searchQuery: '',
      chartLabels: [],
      chartColors: []
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8068/api/averias/listar');
        this.averias = response.data;
        this.updateChart();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateChart() {
      const filteredAverias = this.averias.filter((averia) =>
        averia.tipo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      const averiasCount = filteredAverias.reduce((acc, averia) => {
        if (!acc[averia.tipo]) {
          acc[averia.tipo] = { count: 0, description: averia.descripcion };
        }
        acc[averia.tipo].count += 1;
        return acc;
      }, {});

      this.chartLabels = Object.keys(averiasCount);
      const data = Object.values(averiasCount).map(item => item.count);
      this.chartColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ];

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById('averiasPieChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Tipos de Averías',
            data,
            backgroundColor: this.chartColors,
            borderColor: this.chartColors.map(color => color.replace('0.2', '1')),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || '';
                  const description = Object.values(averiasCount)[context.dataIndex].description || '';
                  return `${label}: ${value} (${((value / data.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%) - ${description}`;
                }
              }
            }
          }
        }
      });
    }
  },
  watch: {
    searchQuery() {
      this.updateChart();
    }
  },
  mounted() {
    this.fetchData();
  }
};
