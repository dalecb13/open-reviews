import { createClient } from "@/lib/supabase/server";

type OfferingListItem = {
  id: string;
  offeringName: string;
  offeringDescription: string;
  purveyorName: string;
  purveyorId: string;
}

type Purveyor = {
  id: string;
  purveyorname: string;
}

export async function getOfferingList() {
  const supabase = await createClient();
  const { data: offerings } = await supabase
    .from('offerings')
    .select(`
      id,
      offeringname,
      offeringdescription,
      purveyors(id, purveyorname)
    `);

  if (!offerings || offerings.length === 0) {
    return [];
  }

  const mappedOfferings = offerings.map(offering => {
    let returnObject = {};
    const purveyor = offering.purveyors as unknown as Purveyor;
    if (purveyor.hasOwnProperty('purveyorname')) {
      const purveyorName = purveyor.purveyorname;
      returnObject = {
        id: offering.id,
        offeringName: offering.offeringname,
        offeringDescription: offering.offeringdescription,
        purveyorName,
        purveyorId: purveyor.id
      }
    } else {
      returnObject = {
        id: offering.id,
        offeringName: offering.offeringname,
        offeringDescription: offering.offeringdescription,
        purveyorName: '',
        purveyorId: ''
      }
    }

    return returnObject;
  });

  return mappedOfferings as OfferingListItem[];
}

type OfferingDetails = {
  id: string;
  offeringName: string;
  offeringDescription: string;
  purveyorName: string;
  purveyorId: string;
}

export async function getOfferingById(id: string) {
  const supabase = await createClient();
  const { data: offering, error } = await supabase
    .from('offerings')
    .select(`
      id,
      offeringname,
      offeringdescription,
      purveyors(id, purveyorname)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.warn(error);
    throw error;
  }

  if (!offering) {
    console.warn(error);
    return null;
  }

  const purveyor = offering.purveyors as unknown as Purveyor;

  const mappedOffering = {
    id: offering.id,
    offeringName: offering.offeringname,
    offeringDescription: offering.offeringdescription,
    purveyorName: purveyor.purveyorname,
    purveyorId: purveyor.id
  }

  return mappedOffering as OfferingDetails;
}