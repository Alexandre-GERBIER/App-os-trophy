    <template>
    <div>
        <h3 is="sui-header">View Trophy and Vote {{ $route.params.id}} {{nom}}</h3>
    </div>
</template>

<script>
// TODO : la route a en paramètre l'id du trophée
// TODO : popup pour modifier le mot de passe
export default {

  data () {
    return {
      trophies: [
        {
          id: '1',
          nom: 'Toujours présent',
          module: 'maths',
          date: '21/05/2018',
          valeur: 'bronze',
          vote: false,
          obtenu: true
        },
        {
          id: '2',
          nom: 'Toujours prêt',
          module: 'algo',
          date: '30/10/2018',
          valeur: 'or',
          vote: true,
          obtenu: false
        },
        {
          id: '3',
          nom: 'Toujours debout',
          module: 'bdd',
          date: '08/02/2018',
          valeur: 'or',
          vote: true,
          obtenu: true
        }
      ]
    }
  }
}
</script>

<style>

</style>
