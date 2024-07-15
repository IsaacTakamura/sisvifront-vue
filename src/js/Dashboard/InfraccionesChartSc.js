import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'InfraccionesChart',
  data() {
    return {
      infracciones: [],
      choferes: [],
      searchQuery: '',
      chart: null
    };
  },
  methods: {
    async fetchData() {
      try {
        const infraccionesResponse = await axios.get('http://localhost:8069/api/infracciones/listar');
        this.infracciones = infraccionesResponse.data;

        const choferIds = [...new Set(this.infracciones.map(inf => inf.choferId))];
        const choferesPromises = choferIds.map(id => axios.get(`http://localhost:8069/api/choferes/listar/${id}`));
        const choferesResponses = await Promise.all(choferesPromises);

        this.choferes = choferesResponses.map(response => response.data);

        this.updateChart();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    filterChoferes() {
      const query = this.searchQuery.toLowerCase();
      const filteredChoferes = this.choferes.filter(chofer =>
        `${chofer.primerNombre} ${chofer.apellidoPaterno}`.toLowerCase().includes(query)
      );
      this.updateChart(filteredChoferes);
    },
    updateChart(filteredChoferes = this.choferes) {
      const infraccionesCount = filteredChoferes.map(chofer => ({
        chofer: `${chofer.primerNombre} ${chofer.apellidoPaterno}`,
        count: this.infracciones.filter(inf => inf.choferId === chofer.id).length
      }));

      const sortedInfraccionesCount = infraccionesCount.sort((a, b) => b.count - a.count).slice(0, 10);

      const labels = sortedInfraccionesCount.map(item => item.chofer);
      const data = sortedInfraccionesCount.map(item => item.count);

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById('infraccionesChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Cantidad de Infracciones',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
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
