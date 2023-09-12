import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/')
	}

	const { data: monsterTypes } = await supabase.from('monster_type').select()
	const { data: monsterTypeRankings } = await supabase.from('monster_profile_ranking').select()

	return {
		monsterTypes: monsterTypes! as { name: string; id: number }[],
		monsterTypeRankings: monsterTypeRankings as { monster_type: number; ranking: string }[]
	}
}
