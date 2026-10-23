import {createClient} from '@supabase/supabase-js';

const url='https://yxgzsrvpvzpsxgzqxpsj.supabase.co';
// A chave publicável pertence ao código do navegador. RLS protege os dados.
const publishableKey='sb_publishable_Bx4PFaypIP01Jg-6SfQa2Q_rUa3FiaD';
const client=createClient(url,publishableKey,{auth:{detectSessionInUrl:true,persistSession:true,autoRefreshToken:true}});
const table='portfolio_entries';

function unwrap(result){if(result.error)throw result.error;return result.data;}
window.siteDb={
  ownerEmail:'leiteneto17@gmail.com',
  client,
  async published(){return unwrap(await client.from(table).select('*').eq('is_published',true).order('created_at',{ascending:false}));},
  async all(){return unwrap(await client.from(table).select('*').order('created_at',{ascending:false}));},
  async save(record){const payload={entry_type:record.entry_type,title:record.title.trim(),category:record.category.trim(),body:record.body.trim(),image_url:record.image_url?.trim()||null,image_alt:record.image_alt?.trim()||null,credit:record.credit?.trim()||null,is_demo:!!record.is_demo,is_published:!!record.is_published,updated_at:new Date().toISOString()};if(record.id)return unwrap(await client.from(table).update(payload).eq('id',record.id).select().single());return unwrap(await client.from(table).insert(payload).select().single());},
  async remove(id){return unwrap(await client.from(table).delete().eq('id',id).select('id').single());}
};
