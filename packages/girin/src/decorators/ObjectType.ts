import { ObjectTypeMetadata, ObjectTypeMetadataConfig } from '../metadata/ObjectTypeMetadata';
import { MetadataStorage } from '../metadata/MetadataStorage';
import { GraphQLObjectTypeConfig, GraphQLFieldConfigMap } from 'graphql';


export interface ObjectTypeDecoratorOptions {
  name?: string;
  meta?: MetadataStorage;
  fields?: () => GraphQLFieldConfigMap<any, any>;

  interfaces?: GraphQLObjectTypeConfig<any, any>["interfaces"];
  isTypeOf?: GraphQLObjectTypeConfig<any, any>["isTypeOf"];
  description?: GraphQLObjectTypeConfig<any, any>["description"];
  astNode?: GraphQLObjectTypeConfig<any, any>["astNode"];
  extensionASTNodes?: GraphQLObjectTypeConfig<any, any>["extensionASTNodes"];
}

export function ObjectType(options: ObjectTypeDecoratorOptions = {}) {
  return function(definitionClass: ObjectTypeDecoratorOptions & Function) {
    const mergedConfig: ObjectTypeMetadataConfig ={
      astNode: options.astNode || definitionClass.astNode,
      description: options.description || definitionClass.description,
      extensionASTNodes: options.extensionASTNodes || definitionClass.extensionASTNodes,
      fields: options.fields || definitionClass.fields,
      interfaces: options.interfaces || definitionClass.interfaces,
      isTypeOf: options.isTypeOf || definitionClass.isTypeOf,
      meta: options.meta || definitionClass.meta,
      name: options.name || definitionClass.name,
      definitionClass,
    }
    ObjectTypeMetadata.create(mergedConfig);
  };
}
