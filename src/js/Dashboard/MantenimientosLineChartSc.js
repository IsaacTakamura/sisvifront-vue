// MantenimientosLineChartSc.js
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'MantenimientosLineChart',
  data() {
    return {
      mantenimientos: [],
      chart: null,
      searchYear: new Date().getFullYear()
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8069/api/mantenimiento/salida/listar');
        this.mantenimientos = response.data.filter(mantenimiento => 
          new Date(mantenimiento.fechaSalida).getFullYear() === this.searchYear
        );
        this.updateChart();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateChart() {
      const mantenimientosCount = Array(12).fill(0);

      this.mantenimientos.forEach(mantenimiento => {
        const month = new Date(mantenimiento.fechaSalida).getMonth();
        mantenimientosCount[month]++;
      });

      const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const data = mantenimientosCount;

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById('mantenimientosLineChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Cantidad de Mantenimientos',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.8)', // Increased opacity
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#fff' // Make y-axis ticks white
              }
            },
            x: {
              ticks: {
                color: '#fff' // Make x-axis ticks white
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#fff' // Make legend text white
              }
            }
          }
        }
      });
    }
  },
  created() {
    this.fetchData();
  }
};
