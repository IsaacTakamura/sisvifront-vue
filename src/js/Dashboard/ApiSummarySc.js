import axios from 'axios';

export default {
  name: 'ApiSummary',
  data() {
    return {
      apiData: [
        { label: 'Choferes', count: 0, icon: require('../../assets/images/chofer-icon.png') },
        { label: 'Vehículos', count: 0, icon: require('../../assets/images/auto-icon.png') },
        { label: 'Averías', count: 0, icon: require('../../assets/images/falla-icon.png') },
        { label: 'Repuestos', count: 0, icon: require('../../assets/images/repuesto-icon.png') }
      ]
    };
  },
  methods: {
    async fetchData() {
      try {
        const [choferes, vehiculos, averias, repuestos] = await Promise.all([
          axios.get('http://localhost:8069/api/choferes/listar'),
          axios.get('http://localhost:8069/api/vehiculos/listar'),
          axios.get('http://localhost:8068/api/averias/listar'),
          axios.get('http://localhost:8069/api/repuestos/listar')
        ]);

        this.apiData[0].count = choferes.data.length;
        this.apiData[1].count = vehiculos.data.length;
        this.apiData[2].count = averias.data.length;
        this.apiData[3].count = repuestos.data.length;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  created() {
    this.fetchData();
  }
};
