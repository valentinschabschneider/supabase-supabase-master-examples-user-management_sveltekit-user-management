<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	export let data

	const { monsterTypes, monsterTypeRankings } = data
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	async function rank(monsterTypeId: number, ranking: string) {
		console.log(monsterTypes)

		let { data: monster_profile_ranking } = await supabase
			.from('monster_profile_ranking')
			.select()
			.eq('monster_type', monsterTypeId)
		console.log('wank', monster_profile_ranking)

		if (monster_profile_ranking!.length > 0) {
			const { error } = await supabase
				.from('monster_profile_ranking')
				.update({ ranking: ranking })
				.eq('monster_type', monsterTypeId)

			console.log(error)
		} else {
			const { error } = await supabase
				.from('monster_profile_ranking')
				.insert([{ profile: session?.user.id, monster_type: monsterTypeId, ranking: ranking }])
		}

		console.log(monsterTypeId, ranking)
	}
</script>

<div>
	<ul>
		{#each monsterTypes as monsterType}
			<li>{monsterType.name}</li>
			<input
				type="text"
				on:input={(e) => rank(monsterType.id, e.currentTarget.value)}
				value={monsterTypeRankings.find((r) => r.monster_type == monsterType.id)?.ranking ||
					'no ranking yet'}
			/>
		{/each}
	</ul>
</div>
